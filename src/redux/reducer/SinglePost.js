import * as constant from "../constant/SinglePost";
import { updateObject } from "../../util/helper";

const initialState = {
  title: "",
  author: "",
  date: "",
  image: "",
  content: ""
};

const singlePostReducer = (state = initialState, action) => {
  if (action.type === constant.FETCH_SINGLE_POST)
    return updateObject(state, {});
  else if (action.type === constant.FETCH_SINGLE_POST_SUCCESS)
    return updateObject(state, {
      title: action.data.title,
      author: action.data.author,
      date: action.data.date,
      image: action.data.image,
      content: action.data.content
    });
  else if (action.type === constant.FETCH_SINGLE_POST_FAIL)
    return updateObject(state, {});
  else return state;
};

export default singlePostReducer;
