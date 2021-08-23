import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { apiClient } from "../../Api/apiClient";
import { useSelector } from "react-redux";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const {
    auth: { user }
  } = useSelector(state => state);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await apiClient.get(`/posts/profile/${username}`)
        : await apiClient.get(`posts/all/${user._id}`);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map(p => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
