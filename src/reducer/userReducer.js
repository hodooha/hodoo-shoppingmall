import * as types from "../constants/user.constants";
const initialState = {
  error: "",
  loading: false,
  user: null,
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_USER_REQUEST:
      return { ...state, error: "", loading: true };

    case types.LOGIN_REQUEST:
      return { ...state, error: "", loading: true };

    case types.LOGIN_WITH_TOKEN_REQUEST:
      return { ...state, error: "", loading: true };

    case types.GOOGLE_LOGIN_REQUEST:
      return { ...state, error: "", loading: true };

    case types.REGISTER_USER_SUCCESS:
      return { ...state, error: "", loading: false };

    case types.LOGIN_SUCCESS:
      return { ...state, error: "", user: payload.user, loading: false };

    case types.LOGIN_WITH_TOKEN_SUCCESS:
      return { ...state, error: "", user: payload.user, loading: false };

    case types.GOOGLE_LOGIN_SUCCESS:
      return { ...state, error: "", user: payload, loading: false };

    case types.REGISTER_USER_FAIL:
      return { ...state, error: payload.error, loading: false };

    case types.LOGIN_FAIL:
      return { ...state, error: payload.error, loading: false };

    case types.LOGIN_WITH_TOKEN_FAIL:
      return { ...state, loading: false, error: "" };

    case types.GOOGLE_LOGIN_FAIL:
      return { ...state, loading: false, error: payload };

    case types.LOGOUT:
      return { ...state, error: "", loading: false, user: null };

    default:
      return { ...state };
  }
}

export default userReducer;
