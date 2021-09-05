import "./rightbar.css";
// import { Users } from "../../dummyData";
// import Online from "../online/Online";
import { useEffect, useState } from "react";
import { apiClient } from "../../Api/apiClient";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import avatar from "../../assets/noAvatar.png";
import { follow, unfollow } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import ad from "../../assets/ad.png";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {
    auth: { user: currentUser }
  } = useSelector(state => state);
  const [followed, setFollowed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const isFriend = currentUser.followings.includes(user?._id);
    isFriend && setFollowed(true);
  }, [currentUser.followings, user?._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await apiClient.get(`/users/friends/${user._id}`);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        const response = await apiClient.post(`/users/${user._id}/unfollow`, {
          userId: currentUser._id
        });
        response.status === 200 && dispatch(unfollow(user._id));
        setFollowed(false);
      } else {
        const response = await apiClient.post(`/users/${user._id}/follow`, {
          userId: currentUser._id
        });
        response.status === 200 && dispatch(follow(user._id));
        setFollowed(true);
      }
    } catch (err) {}
  };

  const redirectHandler = () => {
    window.location.href = "https://neroview.netlify.app/";
  };

  const HomeRightbar = () => {
    return (
      <>
        <img onClick={redirectHandler} className="rightbarAd" src={ad} alt="" />
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          {/* <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div> */}
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map(friend => (
            <Link
              key={friend.username}
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture ? PF + friend.profilePicture : avatar
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
