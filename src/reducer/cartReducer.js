import * as types from "../constants/cart.constants";

const initialState = {
  loading: false,
  error: "",
  cartItemCount: 0,
  cartList: [],
  totalPrice: 0,
};

function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_TO_CART_REQUEST:
      return { ...state, loading: true, error: "" };

    case types.GET_CART_LIST_REQUEST:
      return { ...state, loading: true, error: "" };

    case types.GET_CART_QTY_REQUEST:
      return { ...state, loading: true, error: "" };

    case types.DELETE_CART_ITEM_REQUEST:
      return { ...state, loading: true, error: "" };

    case types.ADD_TO_CART_SUCCESS:
      return { ...state, loading: false, cartItemCount: payload.cartItemCount };

    case types.GET_CART_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        cartList: payload.data,
        cartItemCount: payload.cartItemCount,
        totalPrice: payload.data.reduce(
          (total, item) => (total += item.productId.price * item.qty),
          0
        ),
      };

    case types.GET_CART_QTY_SUCCESS:
      return { ...state, loading: false, cartItemCount: payload };

    case types.DELETE_CART_ITEM_SUCCESS:
      return { ...state, loading: false, cartItemCount: payload.cartItemCount };

    case types.ADD_TO_CART_FAIL:
      return { ...state, loading: false, error: payload };

    case types.GET_CART_LIST_FAIL:
      return { ...state, loading: false, error: payload };

    case types.GET_CART_QTY_FAIL:
      return { ...state, loading: false, error: payload };

    case types.DELETE_CART_ITEM_FAIL:
      return { ...state, loading: false, error: payload };
  }

  return state;
}
export default cartReducer;
