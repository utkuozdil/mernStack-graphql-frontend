import * as constants from "../constant/SinglePost";

export function fetchSinglePost(postId, token) {
  return {
    type: constants.FETCH_SINGLE_POST,
    postId,
    token
  };
}

export function fetchSinglePostSuccess(data) {
  return {
    type: constants.FETCH_SINGLE_POST_SUCCESS,
    data
  };
}

export function fetchSinglePostFail(error) {
  return {
    type: constants.FETCH_SINGLE_POST_FAIL,
    error
  };
}
