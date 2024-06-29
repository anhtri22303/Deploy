// orderReducer.js
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS, } from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    orders: [],
};

export const orderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_ORDER_REQUEST:
        case GET_USERS_ORDERS_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_ORDER_SUCCESS:
            return { ...state, loading: false, error: null, orders: [...state.orders, payload] };

        case GET_USERS_ORDERS_SUCCESS:
            return { ...state, loading: false, error: null, orders: payload };

        case CREATE_ORDER_FAILURE:
        case GET_USERS_ORDERS_FAILURE:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
};
