import * as types from "../constants/product.constants";
const initialState = {
  loading: false,
  error: "",
  productList: [],
  totalPageNum: null,
  selectedProduct: null,
};

function productReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true, error: "" };

    case types.PRODUCT_GET_REQUEST:
      return { ...state, loading: true, error: "" };

    case types.PRODUCT_EDIT_REQUEST:
      return { ...state, loading: true, error: "" };

    case types.PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };

    case types.GET_PRODUCT_DETAIL_REQUEST:
      return { ...state, loading: true, error: "" };

    case types.PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, error: "" };

    case types.PRODUCT_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        productList: payload.data,
        totalPageNum: payload.totalPageNum,
      };

    case types.PRODUCT_EDIT_SUCCESS:
      return { ...state, loading: false, error: "" };

    case types.PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, error: "" };

    case types.GET_PRODUCT_DETAIL_SUCCESS:
      return { ...state, loading: false, selectedProduct: payload };

    case types.PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: payload.error };

    case types.PRODUCT_GET_FAIL:
      return { ...state, loading: false, error: payload, totalPageNum: 0 };

    case types.PRODUCT_EDIT_FAIL:
      return { ...state, loading: false, error: payload };

    case types.PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: payload };

    case types.GET_PRODUCT_DETAIL_FAIL:
      return { ...state, loading: false, error: payload };

    case types.SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: payload };

    default:
      return state;
  }
}

export default productReducer;
