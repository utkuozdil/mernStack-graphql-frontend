import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "../../components/Button/Button";
import FeedEdit from "../../components/Feed/FeedEdit/FeedEdit";
import Post from "../../components/Feed/Post/Post";
import Input from "../../components/Form/Input/Input";
import Loader from "../../components/Loader/Loader";
import Paginator from "../../components/Paginator/Paginator";
import * as action from "../../redux/action/Feed";
import "./Feed.css";

const Feed = props => {
  const [status, setStatus] = useState("");
  const [postPage, setPostPage] = useState(1);

  useEffect(() => {
    props.onFetchStatus(props.token);
    loadPosts();
  }, []);

  const loadPosts = direction => {
    const page = getPage(postPage, direction);
    props.onLoadPosts(page, props.token);
  };

  const getPage = (postPage, direction) => {
    let page = postPage;
    if (direction === "next") {
      page++;
      setPostPage(page);
    }
    if (direction === "previous") {
      page--;
      setPostPage(page);
    }
    return page;
  };

  const statusUpdateHandler = event => {
    event.preventDefault();
    props.onUpdateStatus(status, props.token);
  };

  const newPostHandler = () => props.onSetIsEditing(true);

  const startEditPostHandler = postId => {
    const loadedPost = { ...props.posts.find(p => p._id === postId) };
    props.onSetIsEditing(true);
    props.onSetEditPost(loadedPost);
  };

  const cancelEditHandler = () => {
    props.onSetIsEditing(false);
    props.onSetEditPost(null);
  };

  const finishEditHandler = postData => {
    props.onSetIsEditing(true);
    props.onCreatePost(
      props.editPost ? props.editPost._id : null,
      postData.title,
      postData.content,
      postData.image,
      props.token,
      1,
      props.editPost ? props.editPost.imagePath : null
    );
  };

  const statusInputChangeHandler = (input, value) => {
    setStatus(value);
  };

  const deletePostHandler = postId => {
    props.onSetPostsLoading(true);
    props.onDeletePost(postId, props.token, 1);
  };

  return (
    <Fragment>
      <FeedEdit
        editing={props.isEditing}
        selectedPost={props.editPost}
        loading={props.editLoading}
        onCancelEdit={cancelEditHandler}
        onFinishEdit={finishEditHandler}
      />
      <section className="feed__status">
        <form onSubmit={statusUpdateHandler}>
          <Input
            type="text"
            placeholder="Your status"
            control="input"
            onChange={statusInputChangeHandler}
            value={status.length === 0 ? props.status : status}
          />
          <Button mode="flat" type="submit">
            Update
          </Button>
        </form>
      </section>
      <section className="feed__control">
        <Button mode="raised" design="accent" onClick={newPostHandler}>
          New Post
        </Button>
      </section>
      <section className="feed">
        {props.postsLoading && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Loader />
          </div>
        )}
        {props.posts.length <= 0 && !props.postsLoading ? (
          <p style={{ textAlign: "center" }}>No posts found.</p>
        ) : null}
        {!props.postsLoading && (
          <Paginator
            onPrevious={loadPosts.bind(this, "previous")}
            onNext={loadPosts.bind(this, "next")}
            lastPage={Math.ceil(props.totalPosts / 2)}
            currentPage={postPage}
          >
            {props.posts.map(post => (
              <Post
                key={post._id}
                id={post._id}
                author={post.creator.name}
                date={new Date(post.createdAt).toLocaleDateString("en-US")}
                title={post.title}
                image={post.imageUrl}
                content={post.content}
                onStartEdit={startEditPostHandler.bind(this, post._id)}
                onDelete={deletePostHandler.bind(this, post._id)}
              />
            ))}
          </Paginator>
        )}
      </section>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    status: state.feed.status,
    posts: state.feed.posts,
    totalPosts: state.feed.totalPosts,
    postsLoading: state.feed.postsLoading,
    isEditing: state.feed.isEditing,
    editLoading: state.feed.editLoading,
    editPost: state.feed.editPost,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchStatus: token => dispatch(action.fetchStatus(token)),
    onUpdateStatus: (status, token) =>
      dispatch(action.updateStatus(status, token)),
    onLoadPosts: (page, token) => dispatch(action.loadPosts(page, token)),
    onCreatePost: (id, title, content, image, token, page, imagePath) =>
      dispatch(
        action.createPost(id, title, content, image, token, page, imagePath)
      ),
    onDeletePost: (postId, token, page) =>
      dispatch(action.deletePost(postId, token, page)),
    onSetIsEditing: isEditing => dispatch(action.setIsEditing(isEditing)),
    onSetPostsLoading: postsLoading =>
      dispatch(action.setPostsLoading(postsLoading)),
    onSetEditPost: editPost => dispatch(action.setEditPost(editPost)),
    onSetEditLoading: editLoading =>
      dispatch(action.setEditLoading(editLoading))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
