import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";
import { eventActions } from "./eventAction";

const createOrder = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST });
    const response = await api.post("/order", data);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.CREATE_ORDER_SUCCESS,
      payload: response.data.orderNum,
    });
    const { couponId } = data;
    if (couponId) {
      dispatch(eventActions.deleteCoupon(couponId));
    }
    dispatch(cartActions.getCartQty());
    navigate("/payment/success");
  } catch (err) {
    dispatch({ type: types.CREATE_ORDER_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const getOrder = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_REQUEST });
    const response = await api.get("/order");
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.GET_ORDER_SUCCESS,
      payload: { orderList: response.data.data },
    });
  } catch (err) {
    dispatch({ type: types.GET_ORDER_FAIL, payload: err.error });
  }
};
const getOrderList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_LIST_REQUEST });
    const response = await api.get("/order/all", { params: { ...query } });
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.GET_ORDER_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({ type: types.GET_ORDER_LIST_FAIL, payload: err.error });
  }
};

const updateOrder = (id, status, page) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_ORDER_REQUEST });
    const response = await api.put(`/order/${id}`, { status });
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.UPDATE_ORDER_SUCCESS, payload: response.data });
    dispatch(orderActions.getOrderList({ page }));
  } catch (err) {
    dispatch({ type: types.UPDATE_ORDER_FAIL, payload: err.error });
  }
};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
