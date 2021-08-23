import "./closeFriend.css";
import { Link } from "react-router-dom";
import avatar from "../../assets/noAvatar.png";

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <Link className="sidebarPillWrapper" to={`/profile/${user.username}`}>
        <img
          className="sidebarFriendImg"
          src={user.profilePicture ? PF + user.profilePicture : avatar}
          alt=""
        />
        <span className="sidebarFriendName">{user.username}</span>
      </Link>
    </li>
  );
}
