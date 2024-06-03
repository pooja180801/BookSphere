import { api } from "../../config/apiConfig";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
  } from "./ActionType";
  
  export const createOrder = (deliveryForm) => async (dispatch) => {
    console.log("req_data",deliveryForm)
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const response = await api.post("/order/create", deliveryForm);
      console.log("response",response)

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
    }
  };
  
  export const getOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
    try {
      const response = await api.get(`/order/${orderId}`);
      dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
    }
  };
  