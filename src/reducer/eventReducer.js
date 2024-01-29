import * as types from "../constants/event.constants";

const initialState = {
  coupon: null,
  loading: false,
  error: "",
  couponList: [],
};

function eventReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_COUPON_REQUEST:
      return { ...state, loading: true, error: "" };

    case types.DELETE_COUPON_REQUEST:
      return { ...state, loading: true, error: "" };

    case types.GET_COUPON_LIST_REQUEST:
      return { ...state, loading: true, error: "" };

    case types.GET_COUPON_SUCCESS:
      return { ...state, loading: false, coupon: payload };

    case types.DELETE_COUPON_SUCCESS:
      return { ...state, loading: false, couponList: [] };

    case types.GET_COUPON_LIST_SUCCESS:
      return { ...state, loading: false, couponList: payload };

    case types.GET_COUPON_FAIL:
      return { ...state, loading: false, error: payload };

    case types.DELETE_COUPON_FAIL:
      return { ...state, loading: false, error: payload };

    case types.GET_COUPON_LIST_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
}

export default eventReducer;
