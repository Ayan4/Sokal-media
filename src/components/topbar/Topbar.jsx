import "./topbar.css";
import { Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import avatar from "../../assets/noAvatar.png";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { logout } from "../../features/auth/authSlice";

export default function Topbar() {
  const {
    auth: { user }
  } = useSelector(state => state);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Pulse App</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <Link className="profileLink" to={`/profile/${user.username}`}>
          <div className="profileSection">
            <img
              src={user.profilePicture ? PF + user.profilePicture : avatar}
              alt=""
              className="topbarImg"
            />
            <p className="profileTag">Profile</p>
          </div>
        </Link>
        <Button onClick={handleLogout} variant="outlined">
          Logout
        </Button>
      </div>
    </div>
  );
}
