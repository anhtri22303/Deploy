
import { api } from "../../config/api";
import { CREATE_BUYBACK_FAILURE, CREATE_BUYBACK_OUT_FAILURE, CREATE_BUYBACK_OUT_REQUEST, CREATE_BUYBACK_OUT_SUCCESS, CREATE_BUYBACK_REQUEST, CREATE_BUYBACK_SUCCESS, GET_ALL_BUYBACK_FAILURE, GET_ALL_BUYBACK_REQUEST, GET_ALL_BUYBACK_SUCCESS } from "./Actiontype";



export const createBuyback = (buybackRequest, jewelryCode, jwt) => {
    return async dispatch => {
      dispatch({ type: CREATE_BUYBACK_REQUEST });

    try {
        const response = await api.post
        (`/api/buyback/create?jewelryCode=${jewelryCode}`, buybackRequest, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: CREATE_BUYBACK_SUCCESS, payload: response.data });
        console.log("TẠO THÀNH CÔNG")
        console.log("customer" ,buybackRequest)
        // Handle success scenario if needed
      } catch (error) {
        console.log("data",buybackRequest)
        console.log("error", error)
        dispatch({ type: CREATE_BUYBACK_FAILURE, error: error.message });
        // Handle error scenario
      }
    };
    
  };


export const createBuybackOut = (buybackRequest, createJewelryRequest, jwt) => {
    return async dispatch => {
      dispatch({ type: CREATE_BUYBACK_OUT_REQUEST });
  
      try {
        const response = await api.post('/api/buyback/create/out', { buybackRequest, createJewelryRequest }, {
          headers: {
            Authorization: `Bearer ${jwt}`,
        },
        });
        dispatch({ type: CREATE_BUYBACK_OUT_SUCCESS, payload: response.data });
        console.log("ĐÃ MUA LẠI THÀNH CÔNG")
        // Handle success scenario if needed
      } catch (error) {
        console.log("error",error)
        dispatch({ type: CREATE_BUYBACK_OUT_FAILURE, error: error.message });
        // Handle error scenario
      }
    };
  };

  export const getAllBuyback = ({ jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_BUYBACK_REQUEST });
        try {
            const response = await api.get(
                `/api/buyback`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            console.log("get all component", response.data);
            dispatch({
                type: GET_ALL_BUYBACK_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({ type: GET_ALL_BUYBACK_FAILURE })
            console.log("error", error);
        }
    };
};
