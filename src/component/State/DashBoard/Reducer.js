import {
    GET_TOTAL_ORDER_REQUEST,
    GET_TOTAL_ORDER_SUCCESS,
    GET_TOTAL_ORDER_FAILURE,
    GET_TOTAL_AMOUNT_REQUEST,
    GET_TOTAL_AMOUNT_SUCCESS,
    GET_TOTAL_AMOUNT_FAILURE,
    GET_TOTAL_SOLD_ITEMS_REQUEST,
    GET_TOTAL_SOLD_ITEMS_SUCCESS,
    GET_TOTAL_SOLD_ITEMS_FAILURE,
    GET_TOTAL_ORDER_AREA_REQUEST,
    GET_TOTAL_AMOUNT_AREA_REQUEST,
    GET_TOTAL_SOLD_AREA_ITEMS_REQUEST,
    GET_TOTAL_ORDER_AREA_FAILURE,
    GET_TOTAL_AMOUNT_AREA_FAILURE,
    GET_TOTAL_SOLD_AREA_ITEMS_FAILURE,
    GET_TOTAL_ORDER_AREA_SUCCESS,
    GET_TOTAL_AMOUNT_AREA_SUCCESS,
    GET_TOTAL_SOLD_AREA_ITEMS_SUCCESS
  } from './ActionType';
  
  const initialState = {
    loading: false,
    totalOrders: 0,
    totalAmount: 0.0,
    totalSoldItems: 0,
    totalOrdersArea: 0,
    totalAmountArea: 0.0,
    totalSoldItemsArea: 0,
    error: null
  };
  
  const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_TOTAL_ORDER_REQUEST:
      case GET_TOTAL_AMOUNT_REQUEST:
      case GET_TOTAL_SOLD_ITEMS_REQUEST:
      case GET_TOTAL_ORDER_AREA_REQUEST:
      case GET_TOTAL_AMOUNT_AREA_REQUEST:
      case GET_TOTAL_SOLD_AREA_ITEMS_REQUEST:
      
        return {
          ...state,
          loading: true
        };
      case GET_TOTAL_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          totalOrders: action.payload
        };
      case GET_TOTAL_AMOUNT_SUCCESS:
        return {
          ...state,
          loading: false,
          totalAmount: action.payload
        };
      case GET_TOTAL_SOLD_ITEMS_SUCCESS:
        return {
          ...state,
          loading: false,
          totalSoldItems: action.payload
        };
        case GET_TOTAL_ORDER_AREA_SUCCESS:
        return {
          ...state,
          loading: false,
          totalOrdersArea: action.payload
        };
      case GET_TOTAL_AMOUNT_AREA_SUCCESS:
        return {
          ...state,
          loading: false,
          totalAmountArea: action.payload
        };
      case GET_TOTAL_SOLD_AREA_ITEMS_SUCCESS:
        return {
          ...state,
          loading: false,
          totalSoldItemsArea: action.payload
        };
      case GET_TOTAL_ORDER_FAILURE:
      case GET_TOTAL_AMOUNT_FAILURE:
      case GET_TOTAL_SOLD_ITEMS_FAILURE:
      case GET_TOTAL_ORDER_AREA_FAILURE:
      case GET_TOTAL_AMOUNT_AREA_FAILURE:
      case GET_TOTAL_SOLD_AREA_ITEMS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error
        };
      default:
        return state;
    }
  };
  
  export default dashboardReducer;
  