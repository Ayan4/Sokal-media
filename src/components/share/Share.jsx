import "./share.css";
import { PermMedia, Cancel } from "@material-ui/icons";
import avatar from "../../assets/noAvatar.png";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { apiClient } from "../../Api/apiClient";

export default function Share() {
  const {
    auth: { user }
  } = useSelector(state => state);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async e => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await apiClient.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    if (desc.current.value !== "") {
      await apiClient.post("/posts", newPost);
      window.location.reload();
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.profilePicture ? user.profilePicture : avatar}
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={e => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
