import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { findErrors } from "../../util/error";
import { graphqlPath, imageUploadPath } from "../../util/path";
import {
  createPostQuery,
  fetchStatusQuery,
  loadPostsQuery,
  updatePostQuery,
  updateStatusQuery,
  deletePostQuery
} from "../../util/query";
import * as actions from "../action/Feed";
import * as constant from "../constant/Feed";

export function* fetchStatusHandler(action) {
  try {
    const graphqlQuery = {
      query: fetchStatusQuery
    };
    const responseJSON = yield axios.post(
      graphqlPath,
      JSON.stringify(graphqlQuery),
      {
        headers: {
          Authorization: "Bearer " + action.token,
          "Content-Type": "application/json"
        }
      }
    );
    const responseData = responseJSON.data;
    findErrors(responseData, "fetching status failed");
    const data = {
      status: responseData.data.user.status
    };
    yield put(actions.fetchStatusSuccess(data));
  } catch (error) {
    yield put(actions.fetchStatusFail(error));
  }
}

export function* updateStatusHandler(action) {
  const { status, token } = action;
  console.log(status);
  try {
    const graphqlQuery = {
      query: updateStatusQuery,
      variables: {
        status: status
      }
    };
    const responseJSON = yield axios.post(
      graphqlPath,
      JSON.stringify(graphqlQuery),
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        }
      }
    );
    const responseData = responseJSON.data;
    findErrors(responseData, "updating status failed");
    const data = {
      status: responseData.data.user.status
    };
    yield put(actions.updateStatusSuccess(data));
  } catch (error) {
    yield put(actions.updateStatusFail(error));
  }
}

export function* loadPostsHandler(action) {
  const { page, token } = action;
  try {
    const data = yield* loadPosts(page, token);
    yield put(actions.loadPostsSuccess(data));
  } catch (error) {
    yield put(actions.loadPostsFail(error));
  }
}

export function* createPostHandler(action) {
  const { id, title, content, image, token, page, imagePath } = action;
  try {
    const formData = new FormData();
    formData.append("image", image);
    if (id) formData.append("oldPath", imagePath);
    const fileResponseJSON = yield axios.put(imageUploadPath, formData, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    });
    const fileResponseData = fileResponseJSON.data;
    const imageUrl = fileResponseData.filePath
      ? fileResponseData.filePath.replace("\\", "/")
      : "undefined";

    let graphqlQuery = {
      query: createPostQuery,
      variables: {
        title,
        content,
        imageUrl
      }
    };
    if (id)
      graphqlQuery = {
        query: updatePostQuery,
        variables: {
          id,
          title,
          content,
          imageUrl
        }
      };
    const responseJSON = yield axios.post(
      graphqlPath,
      JSON.stringify(graphqlQuery),
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        }
      }
    );
    const responseData = responseJSON.data;
    findErrors(responseData, "creating or updating posts failed");
    const data = yield* loadPosts(page, token);
    yield put(actions.createPostSuccess(data));
  } catch (error) {
    yield put(actions.createPostFail(error));
  }
}

export function* deletePostHandler(action) {
  const { token, page, postId } = action;
  const graphqlQuery = {
    query: deletePostQuery,
    variables: {
      id: postId
    }
  };
  try {
    const responseJSON = yield axios.post(
      graphqlPath,
      JSON.stringify(graphqlQuery),
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        }
      }
    );
    const responseData = responseJSON.data;
    findErrors(responseData, "deleting posts failed");
    const data = yield* loadPosts(page, token);
    yield put(actions.deletePostSuccess(data));
  } catch (error) {
    yield put(actions.deletePostFail(error));
  }
}

function* loadPosts(page, token) {
  const graphqlQuery = {
    query: loadPostsQuery,
    variables: {
      page
    }
  };

  const responseJSON = yield axios.post(
    graphqlPath,
    JSON.stringify(graphqlQuery),
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    }
  );
  const responseData = responseJSON.data;
  findErrors(responseData, "fetching posts failed");
  const data = {
    posts: responseData.data.posts.posts.map(item => {
      return { ...item, imagePath: item.imageUrl };
    }),
    totalPosts: responseData.data.posts.totalPosts,
    postsLoading: false
  };
  return data;
}

export default function* feedHandler() {
  yield takeLatest(constant.FETCH_STATUS, fetchStatusHandler);
  yield takeLatest(constant.UPDATE_STATUS, updateStatusHandler);
  yield takeLatest(constant.LOAD_POSTS, loadPostsHandler);
  yield takeLatest(constant.CREATE_POST, createPostHandler);
  yield takeLatest(constant.DELETE_POST, deletePostHandler);
}
