import { CHECK_OR_CREATE_CUSTOMER_FAILURE, CHECK_OR_CREATE_CUSTOMER_REQUEST, CHECK_OR_CREATE_CUSTOMER_SUCCESS } from "./Actiontype";

const initialState = {
    customer: null,
    loading: false,
    error: null,
  };
  
  const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHECK_OR_CREATE_CUSTOMER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CHECK_OR_CREATE_CUSTOMER_SUCCESS:
        return {
          ...state,
          customer: action.payload,
          loading: false,
        };
      case CHECK_OR_CREATE_CUSTOMER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default customerReducer;