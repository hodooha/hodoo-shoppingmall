import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import { cartActions } from "./cartAction";

const loginWithToken = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });
    const response = await api.get("/user/me");
    if (response.status !== 200) {
      throw new Error(response.error);
    }
    dispatch({
      type: types.LOGIN_WITH_TOKEN_SUCCESS,
      payload: { user: response.data.user },
    });
    dispatch(cartActions.getCartQty());
  } catch (error) {
    dispatch({
      type: types.LOGIN_WITH_TOKEN_FAIL,
      payload: { error: error.error },
    });
  }
};
const loginWithEmail =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: types.LOGIN_REQUEST,
      });
      const response = await api.post("/auth/login", { email, password });
      if (response.status !== 200) {
        throw new Error(response.error);
      }
      const { user, token } = response.data;
      sessionStorage.setItem("token", token);
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { user: user },
      });
      dispatch(cartActions.getCartQty());
    } catch (error) {
      dispatch({ type: types.LOGIN_FAIL, payload: { error: error.error } });
    }
  };
const logout = () => async (dispatch) => {
  dispatch({ type: types.LOGOUT });
  sessionStorage.removeItem("token");
  dispatch(cartActions.getCartQty());
};

const loginWithGoogle = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
    const response = await api.post("/auth/google", { token });
    if (response.status !== 200) throw new Error(response.error);
    sessionStorage.setItem("token", response.data.token);
    dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: response.data.user });
    dispatch(commonUiActions.showToastMessage("구글 로그인 성공", "success"));
  } catch (err) {
    dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const registerUser =
  ({ email, name, password }, navigate) =>
  async (dispatch) => {
    try {
      dispatch({
        type: types.REGISTER_USER_REQUEST,
      });
      const response = await api.post("/user", { email, name, password });
      if (response.status !== 200) throw new Error(response.error);
      dispatch({ type: types.REGISTER_USER_SUCCESS });
      dispatch(
        commonUiActions.showToastMessage("회원가입을 완료했습니다.", "success")
      );
      navigate("/login");
    } catch (error) {
      dispatch({
        type: types.REGISTER_USER_FAIL,
        payload: { error: error.error },
      });
    }
  };
export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
};
