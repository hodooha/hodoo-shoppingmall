import api from "../utils/api";
import { commonUiActions } from "./commonUiAction";
import * as types from "../constants/event.constants";

const getCoupon = (coupon, couponDuration) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_COUPON_REQUEST });
    const response = await api.post(`/event/coupon/${coupon}`, {
      couponDuration,
    });
    dispatch({ type: types.GET_COUPON_SUCCESS, payload: response.data.data });
    dispatch(commonUiActions.showToastMessage("쿠폰 발급 완료", "success"));
  } catch (err) {
    dispatch({ type: types.GET_COUPON_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const deleteCoupon = (couponId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_COUPON_REQUEST });
    const response = await api.delete(`/event/coupon/${couponId}`);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.DELETE_COUPON_SUCCESS,
    });
  } catch (err) {
    dispatch({ type: types.DELETE_COUPON_FAIL, payload: err.error });
  }
};

const getCouponList = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_COUPON_LIST_REQUEST });
    const response = await api.get("/event/coupon/me");
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.GET_COUPON_LIST_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({ type: types.GET_COUPON_LIST_FAIL, payload: err.error });
  }
};
export const eventAction = { getCoupon, deleteCoupon, getCouponList };
