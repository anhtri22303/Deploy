import { CHECK_OR_CREATE_CUSTOMER_FAILURE, CHECK_OR_CREATE_CUSTOMER_REQUEST, CHECK_OR_CREATE_CUSTOMER_SUCCESS } from "./Actiontype";
import { api } from '../../config/api';

export const checkOrCreateCustomer = (customerData) => async (dispatch) => {
    dispatch({ type: CHECK_OR_CREATE_CUSTOMER_REQUEST });
    try {
      const response = await api.post('/api/customer', customerData);
      dispatch({
        type: CHECK_OR_CREATE_CUSTOMER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CHECK_OR_CREATE_CUSTOMER_FAILURE,
        payload: error.message,
      });
    }
  };