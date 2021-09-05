import "./sidebar.css";
import CloseFriend from "../closeFriend/CloseFriend";
import { useEffect, useState } from "react";
import { apiClient } from "../../Api/apiClient";

export default function Sidebar() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await apiClient.get("/users/all");
      setAllUsers(response.data.users);
    };
    fetchUsers();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <h2>Explore</h2>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {allUsers.map(u => (
            <CloseFriend key={u._id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
