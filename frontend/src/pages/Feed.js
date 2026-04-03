import { useEffect, useState } from "react";
import axios from "axios";

function Feed() {

  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [comment, setComment] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPosts = async () => {
    const res = await axios.get("https://social-app-backend.onrender.com/api/posts/feed");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!text && !image) return alert("Add something");

    await axios.post("https://social-app-backend.onrender.com/api/posts/create", {
      username: user.username,
      text,
      image
    });

    setText("");
    setImage("");
    fetchPosts();
  };

  const likePost = async (id) => {
    await axios.put(`https://social-app-xaua.onrender.com/api/posts/like/${id}`, {
      username: user.username
    });
    fetchPosts();
  };

  const addComment = async (id) => {
    await axios.put(`https://social-app-xaua.onrender.com/api/posts/comment/${id}`, {
      username: user.username,
      comment: comment[id]
    });

    setComment({ ...comment, [id]: "" });
    fetchPosts();
  };

  return (
    <div>

      <div className="header">
        Social App
        <button
          style={{ float: "right" }}
          onClick={() => {
            localStorage.clear();
            window.location = "/";
          }}
        >
          Logout
        </button>
      </div>

      <div className="container">

        {/* CREATE POST */}
        <div className="card">
          <input
            className="input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
          />

          <input
            className="input"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
          />

          <button className="btn" onClick={createPost}>
            Post
          </button>
        </div>

        {/* POSTS */}
        {posts.map((post) => (
          <div className="card" key={post._id}>

            <div className="row">
              <div className="avatar">{post.username[0]}</div>
              <b>{post.username}</b>
            </div>

            <p>{post.text}</p>

            {post.image && (
              <img src={post.image} alt="post" className="post-img" />
            )}

            <div className="actions">
              <button onClick={() => likePost(post._id)}>
                ❤️ {post.likes.length}
              </button>
            </div>

            {/* COMMENTS */}
            {post.comments.map((c, i) => (
              <div key={i} className="comment">
                <b>{c.username}</b>: {c.comment}
              </div>
            ))}

            <input
              className="input"
              value={comment[post._id] || ""}
              onChange={(e) =>
                setComment({ ...comment, [post._id]: e.target.value })
              }
              placeholder="Write comment..."
            />

            <button className="btn" onClick={() => addComment(post._id)}>
              Comment
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Feed;
