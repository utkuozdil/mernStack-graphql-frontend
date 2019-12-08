import * as constant from "../constant/Auth";
import { updateObject } from "../../util/helper";

const initialState = {
  isAuth: false,
  token: null,
  authLoading: false,
  userId: null,
  autoLogout: 0
};

const authReducer = (state = initialState, action) => {
  if (action.type === constant.LOGIN) return updateObject(state, {});
  else if (action.type === constant.LOGIN_SUCCESS)
    return updateObject(state, {
      isAuth: action.data.isAuth,
      token: action.data.token,
      authLoading: action.data.authLoading,
      userId: action.data.userId,
      autoLogout: action.data.autoLogout
    });
  else if (action.type === constant.LOGIN_FAIL) return updateObject(state, {});
  else if (action.type === constant.LOGOUT) return updateObject(state, {});
  else if (action.type === constant.LOGOUT_SUCCESS)
    return updateObject(state, {
      isAuth: action.data.isAuth,
      token: action.data.token,
      authLoading: action.data.authLoading,
      userId: action.data.userId,
      autoLogout: action.data.autoLogout
    });
  else if (action.type === constant.LOGOUT_FAIL) return updateObject(state, {});
  else if (action.type === constant.SIGNUP) return updateObject(state, {});
  else if (action.type === constant.SIGNUP_SUCCESS)
    return updateObject(state, {
      isAuth: action.data.isAuth,
      authLoading: action.data.authLoading
    });
  else if (action.type === constant.SIGNUP_FAIL) return updateObject(state, {});
  else if (action.type === constant.IS_AUTH)
    return updateObject(state, {
      isAuth: action.isAuth
    });
  else if (action.type === constant.SET_TOKEN)
    return updateObject(state, {
      token: action.token
    });
  else if (action.type === constant.SET_USER_ID)
    return updateObject(state, {
      userId: action.userId
    });
  else if (action.type === constant.SET_AUTH_LOADING)
    return updateObject(state, {
      authLoading: action.authLoading
    });
  else return state;
};

export default authReducer;
