import { put, takeLatest } from "redux-saga/effects";
import * as actions from "../action/SinglePost";
import * as constant from "../constant/SinglePost";
import { fetchSinglePostQuery } from "../../util/query";
import { graphqlPath, imagePath } from "../../util/path";
import axios from "axios";
import { findErrors } from "../../util/error";

export function* fetchSinglePostHandler(action) {
  try {
    const graphqlQuery = {
      query: fetchSinglePostQuery,
      variables: {
        id: action.postId
      }
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
    findErrors(responseData, "fetching post failed");
    const data = {
      title: responseData.data.post.title,
      author: responseData.data.post.creator.name,
      image: imagePath + responseData.data.post.imageUrl,
      date: new Date(responseData.data.post.createdAt).toLocaleDateString(
        "en-US"
      ),
      content: responseData.data.post.content
    };
    yield put(actions.fetchSinglePostSuccess(data));
  } catch (error) {
    yield put(actions.fetchSinglePostFail(error));
  }
}

export default function* singlePostHandler() {
  yield takeLatest(constant.FETCH_SINGLE_POST, fetchSinglePostHandler);
}
