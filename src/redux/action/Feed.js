import * as constants from "../constant/Feed";

export function fetchStatus(token) {
  return {
    type: constants.FETCH_STATUS,
    token
  };
}

export function fetchStatusSuccess(data) {
  return {
    type: constants.FETCH_STATUS_SUCCESS,
    data
  };
}

export function fetchStatusFail(error) {
  return {
    type: constants.FETCH_STATUS_FAIL,
    error
  };
}

export function updateStatus(status, token) {
  return {
    type: constants.UPDATE_STATUS,
    status,
    token
  };
}

export function updateStatusSuccess(data) {
  return {
    type: constants.UPDATE_STATUS_SUCCESS,
    data
  };
}

export function updateStatusFail(error) {
  return {
    type: constants.UPDATE_STATUS_FAIL,
    error
  };
}

export function loadPosts(page, token) {
  return {
    type: constants.LOAD_POSTS,
    page,
    token
  };
}

export function loadPostsSuccess(data) {
  return {
    type: constants.LOAD_POSTS_SUCCESS,
    data
  };
}

export function loadPostsFail(error) {
  return {
    type: constants.LOAD_POSTS_FAIL,
    error
  };
}

export function createPost(id, title, content, image, token, page, imagePath) {
  return {
    type: constants.CREATE_POST,
    id,
    title,
    content,
    image,
    token,
    page,
    imagePath
  };
}

export function createPostSuccess(data) {
  return {
    type: constants.CREATE_POST_SUCCESS,
    data
  };
}

export function createPostFail(error) {
  return {
    type: constants.CREATE_POST_FAIL,
    error
  };
}

export function deletePost(postId, token, page) {
  return {
    type: constants.DELETE_POST,
    postId,
    token,
    page
  };
}

export function deletePostSuccess(data) {
  return {
    type: constants.DELETE_POST_SUCCESS,
    data
  };
}

export function deletePostFail(error) {
  return {
    type: constants.DELETE_POST_FAIL,
    error
  };
}

export function setIsEditing(isEditing) {
  return {
    type: constants.IS_EDITING,
    isEditing
  };
}

export function setPostsLoading(postLoading) {
  return {
    type: constants.POSTS_LOADING,
    postLoading
  };
}

export function setEditPost(editPost) {
  return {
    type: constants.EDIT_POST,
    editPost
  };
}

export function setEditLoading(editLoading) {
  return {
    type: constants.EDIT_LOADING,
    editLoading
  };
}
