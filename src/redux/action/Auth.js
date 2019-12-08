import * as constants from "../constant/Auth";

export function login(email, password) {
  return {
    type: constants.LOGIN,
    email,
    password
  };
}

export function loginSuccess(data) {
  return {
    type: constants.LOGIN_SUCCESS,
    data
  };
}

export function loginFail(error) {
  return {
    type: constants.LOGIN_FAIL,
    error
  };
}

export function logout(history) {
  return {
    type: constants.LOGOUT,
    history
  };
}

export function logoutSuccess(data) {
  return {
    type: constants.LOGOUT_SUCCESS,
    data
  };
}

export function logoutFail(error) {
  return {
    type: constants.LOGOUT_FAIL,
    error
  };
}

export function signup(email, name, password, history) {
  return {
    type: constants.SIGNUP,
    email,
    name,
    password,
    history
  };
}

export function signupSuccess(data) {
  return {
    type: constants.SIGNUP_SUCCESS,
    data
  };
}

export function signupFail(error) {
  return {
    type: constants.SIGNUP_FAIL,
    error
  };
}

export function setIsAuth(isAuth) {
  return {
    type: constants.IS_AUTH,
    isAuth
  };
}

export function setToken(token) {
  return {
    type: constants.SET_TOKEN,
    token
  };
}

export function setUserId(userId) {
  return {
    type: constants.SET_USER_ID,
    userId
  };
}

export function setAuthLoading(authLoading) {
  return {
    type: constants.SET_AUTH_LOADING,
    authLoading
  };
}
