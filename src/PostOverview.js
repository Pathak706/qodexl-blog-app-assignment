import React, { useState, useEffect } from "react";
import { Button, Image, Modal, Comment, Divider } from "semantic-ui-react";

const PostOverview = ({ open, setOpen, post }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/posts/${post.id}/comments`)
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((res) => setComments(res))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [post]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>
        <p>{post.title}</p>
        <span>{post.username}</span>
      </Modal.Header>
      <Modal.Content image scrolling>
        <Image size="medium" src="/images/loader.png" wrapped />
        <Modal.Description>
          <p>{post.body}</p>
          <Divider />
          <Comment.Group>
            {comments.map((comment) => (
              <React.Fragment key={comment.id}>
                <Comment>
                  <Comment.Avatar as="a" src="/images/avtar.jpg" />
                  <Comment.Content>
                    <Comment.Author>
                      <p>{comment.name}</p>
                      <a href={`mailto:${comment.email}`}>{comment.email}</a>
                      <Divider />
                    </Comment.Author>
                    <Comment.Text>
                      <p>{comment.body}</p>
                    </Comment.Text>
                  </Comment.Content>
                </Comment>
                <Divider />
              </React.Fragment>
            ))}
          </Comment.Group>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} primary>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default PostOverview;
