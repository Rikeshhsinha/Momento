import { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/get-posts")
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <main className="feed">

      {/* Feed Heading */}
      <div className="feed-heading">
        <p>DISCOVER</p>

        <h1>Your Feed</h1>

        <span>
          Moments worth remembering.
        </span>
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="post-card"
          >

            {/* User */}
            <div className="post-user">

              <div className="avatar">
                M
              </div>

              <div>
                <h3>momento_user</h3>
                <p>Today</p>
              </div>

              <button className="more">
                •••
              </button>

            </div>

            {/* Image */}
            <img
              className="post-image"
              src={post.image}
              alt={post.caption}
            />

            {/* Content */}
            <div className="post-content">

              {/* Actions */}
              <div className="post-actions">

                <div>
                  <button>♡</button>
                  <button>💬</button>
                  <button>↗</button>
                </div>

                <button>♡</button>

              </div>

              {/* Likes */}
              <p className="likes">
                0 likes
              </p>

              {/* Caption */}
              <p className="caption">
                <strong>
                  momento_user
                </strong>{" "}

                {post.caption}
              </p>

              {/* Comments */}
              <p className="comments">
                View all comments
              </p>

            </div>

          </div>
        ))
      ) : (
        <p>
          No posts available.
        </p>
      )}

    </main>
  );
};

export default Feed;

