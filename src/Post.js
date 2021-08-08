import React, { useState, useContext } from "react";
import { DataContext } from "./DataContext";
import PostOverview from "./PostOverview";

const Post = (props) => {
  const { posts } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [modalPost, setModalPost] = useState({});

  const handlePostModal = (post) => {
    setModalPost(post);
    setOpen(true);
  };
  return (
    <>
      <div className="ui divided items">
        {posts.length &&
          posts.map((post) => (
            <div className="item" key={post.id} style={{ cursor: "pointer" }}>
              <div className="image" onClick={() => handlePostModal(post)}>
                <img src="/images/loader.png" alt="loading" />
              </div>
              <div className="content">
                <p className="header" onClick={() => handlePostModal(post)}>
                  {post.title}
                </p>
                <div className="meta">
                  <span>
                    <u>
                      Created by&nbsp;
                      <a href={`/user-details/${post.userId}`}>
                        {post.username}
                      </a>
                    </u>
                  </span>
                </div>
                <div
                  className="description"
                  onClick={() => handlePostModal(post)}
                >
                  <p>{post.body}</p>
                </div>
                <div className="extra">Additional Details</div>
              </div>
            </div>
          ))}
      </div>
      <PostOverview open={open} setOpen={setOpen} post={modalPost} />
    </>
  );
};

export default Post;
