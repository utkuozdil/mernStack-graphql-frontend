import * as constant from "../constant/Feed";
import { updateObject } from "../../util/helper";

const initialState = {
  status: "",
  posts: [],
  totalPosts: 0,
  postsLoading: true,
  isEditing: false,
  editLoading: false,
  editPost: null
};

const feedReducer = (state = initialState, action) => {
  if (action.type === constant.FETCH_STATUS) return updateObject(state, {});
  else if (action.type === constant.FETCH_STATUS_SUCCESS)
    return updateObject(state, { status: action.data.status });
  else if (action.type === constant.FETCH_STATUS_FAIL)
    return updateObject(state, {});
  else if (action.type === constant.UPDATE_STATUS)
    return updateObject(state, {});
  else if (action.type === constant.UPDATE_STATUS_SUCCESS)
    return updateObject(state, { status: action.data.status });
  else if (action.type === constant.UPDATE_STATUS_FAIL)
    return updateObject(state, {});
  else if (action.type === constant.LOAD_POSTS) return updateObject(state, {});
  else if (action.type === constant.LOAD_POSTS_SUCCESS)
    return updateObject(state, {
      posts: action.data.posts,
      totalPosts: action.data.totalPosts,
      postsLoading: action.data.postsLoading
    });
  else if (action.type === constant.LOAD_POSTS_FAIL)
    return updateObject(state, {});
  else if (action.type === constant.CREATE_POST) return updateObject(state, {});
  else if (action.type === constant.CREATE_POST_SUCCESS)
    return updateObject(state, {
      posts: action.data.posts,
      totalPosts: action.data.totalPosts,
      isEditing: false,
      editLoading: false,
      editPost: null
    });
  else if (action.type === constant.CREATE_POST_FAIL)
    return updateObject(state, {
      isEditing: false,
      editLoading: false,
      editPost: null
    });
  else if (action.type === constant.DELETE_POST) return updateObject(state, {});
  else if (action.type === constant.DELETE_POST_SUCCESS)
    return updateObject(state, {
      posts: action.data.posts,
      totalPosts: action.data.totalPosts
    });
  else if (action.type === constant.DELETE_POST_FAIL)
    return updateObject(state, { postsLoading: false });
  else if (action.type === constant.IS_EDITING)
    return updateObject(state, {
      isEditing: action.isEditing
    });
  else if (action.type === constant.POSTS_LOADING)
    return updateObject(state, {
      postsLoading: action.postsLoading
    });
  else if (action.type === constant.EDIT_POST)
    return updateObject(state, {
      editPost: action.editPost
    });
  else if (action.type === constant.EDIT_LOADING)
    return updateObject(state, {
      editLoading: action.editLoading
    });
  else return state;
};

export default feedReducer;
