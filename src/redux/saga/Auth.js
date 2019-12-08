import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { findErrors, findValidationErrors } from "../../util/error";
import { graphqlPath } from "../../util/path";
import { loginQuery, signupQuery } from "../../util/query";
import * as actions from "../action/Auth";
import * as constant from "../constant/Auth";

export function* loginHandler(action) {
  const { email, password } = action;
  try {
    const graphqlQuery = {
      query: loginQuery,
      variables: {
        email: email,
        password: password
      }
    };
    const responseJSON = yield axios.post(
      graphqlPath,
      JSON.stringify(graphqlQuery),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const responseData = responseJSON.data;
    findValidationErrors(responseData);
    findErrors(responseData, "login failed");

    localStorage.setItem("token", responseData.data.login.token);
    localStorage.setItem("userId", responseData.data.login.userId);
    const remainingMilliseconds = 4 * 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem("expiryDate", expiryDate.toISOString());

    const data = {
      isAuth: true,
      token: responseData.data.login.token,
      authLoading: false,
      userId: responseData.data.login.userId,
      autoLogout: remainingMilliseconds
    };

    yield put(actions.loginSuccess(data));
  } catch (error) {
    yield put(actions.loginFail(error));
  }
}

export function* logoutHandler(action) {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");

    const data = {
      isAuth: false,
      token: null
    };

    yield put(actions.logoutSuccess(data));
  } catch (error) {
    yield put(actions.logoutFail(error));
  }
}

export function* signupHandler(action) {
  const { email, name, password, history } = action;
  try {
    const graphqlQuery = {
      query: signupQuery,
      variables: {
        email: email,
        name: name,
        password: password
      }
    };
    const responseJSON = yield axios.post(
      graphqlPath,
      JSON.stringify(graphqlQuery),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const responseData = responseJSON.data;
    findValidationErrors(responseData);
    findErrors(responseData, "user creation failed");

    const data = {
      isAuth: false,
      authLoading: false
    };

    history.replace("/");

    yield put(actions.signupSuccess(data));
  } catch (error) {
    yield put(actions.signupFail(error));
  }
}

export default function* authHandler() {
  yield takeLatest(constant.LOGIN, loginHandler);
  yield takeLatest(constant.LOGOUT, logoutHandler);
  yield takeLatest(constant.SIGNUP, signupHandler);
}
