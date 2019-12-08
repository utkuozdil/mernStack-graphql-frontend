import React, { useEffect } from "react";
import { connect } from "react-redux";
import Image from "../../../components/Image/Image";
import { fetchSinglePost } from "../../../redux/action/SinglePost";
import "./SinglePost.css";

const SinglePost = props => {
  useEffect(() => {
    const postId = props.match.params.postId;
    props.onFetchSinglePost(postId, props.token);
  }, []);

  return (
    <section className="single-post">
      <h1>{props.title}</h1>
      <h2>
        Created by {props.author} on {props.date}
      </h2>
      <div className="single-post__image">
        <Image contain imageUrl={props.image} />
      </div>
      <p>{props.content}</p>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    title: state.singlePost.title,
    author: state.singlePost.author,
    date: state.singlePost.date,
    image: state.singlePost.image,
    content: state.singlePost.content,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchSinglePost: (postId, token) =>
      dispatch(fetchSinglePost(postId, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost);
