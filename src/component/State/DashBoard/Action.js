import axios from 'axios';
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
  GET_TOTAL_ORDER_AREA_SUCCESS,
  GET_TOTAL_ORDER_AREA_FAILURE,
  GET_TOTAL_AMOUNT_AREA_REQUEST,
  GET_TOTAL_AMOUNT_AREA_SUCCESS,
  GET_TOTAL_AMOUNT_AREA_FAILURE,
  GET_TOTAL_SOLD_AREA_ITEMS_REQUEST,
  GET_TOTAL_SOLD_AREA_ITEMS_SUCCESS,
  GET_TOTAL_SOLD_AREA_ITEMS_FAILURE
} from './ActionType';

const API_URL = '/api/dashboard';

export const getTotalOrdersByStatus = (status, jwt) => async (dispatch) => {
  dispatch({ type: GET_TOTAL_ORDER_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/total-orders/${status}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    dispatch({ type: GET_TOTAL_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_TOTAL_ORDER_FAILURE, error: error.message });
  }
};

export const getTotalAmountByStatus = (status, jwt) => async (dispatch) => {
  dispatch({ type: GET_TOTAL_AMOUNT_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/total-amount/${status}`,{
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    dispatch({ type: GET_TOTAL_AMOUNT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_TOTAL_AMOUNT_FAILURE, error: error.message });
  }
};

export const getTotalSoldItemsByStatus = (status, jwt) => async (dispatch) => {
  dispatch({ type: GET_TOTAL_SOLD_ITEMS_REQUEST  });
  try {
    const response = await axios.get(`${API_URL}/total-sold-items/${status}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    dispatch({ type: GET_TOTAL_SOLD_ITEMS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_TOTAL_SOLD_ITEMS_FAILURE, error: error.message });
  }
};








export const getTotalOrdersByAreaAndStatus = (areaId,status, jwt) => async (dispatch) => {
  dispatch({ type: GET_TOTAL_ORDER_AREA_REQUEST });
  try {
    const response = await axios.get(`/api/dashboard/total-orders/area?areaId=${areaId}&orderStatus=${status}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    dispatch({ type: GET_TOTAL_ORDER_AREA_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_TOTAL_ORDER_AREA_FAILURE, error: error.message });
  }
};

export const getTotalAmountByAreaAndStatus = (areaId,status, jwt) => async (dispatch) => {
  dispatch({ type: GET_TOTAL_AMOUNT_AREA_REQUEST });
  try {
    const response = await axios.get(`/api/dashboard/total-amount/area?areaId=${areaId}&orderStatus=${status}`,{
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    dispatch({ type: GET_TOTAL_AMOUNT_AREA_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("error",error)
    dispatch({ type: GET_TOTAL_AMOUNT_AREA_FAILURE, error: error.message });
  }
};

export const getTotalItemsByAreaAndStatus = (areaId,status, jwt) => async (dispatch) => {
  dispatch({ type: GET_TOTAL_SOLD_AREA_ITEMS_REQUEST });
  try {
    const response = await axios.get(`/api/dashboard/total-items/area?areaId=${areaId}&orderStatus=${status}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    dispatch({ type: GET_TOTAL_SOLD_AREA_ITEMS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_TOTAL_SOLD_AREA_ITEMS_FAILURE, error: error.message });
  }
};
