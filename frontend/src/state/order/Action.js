import { api } from "../../config/apiConfig";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    CONFIRM_ORDER_SUCCESS,
    CONFIRM_ORDER_FAILURE,
    CLEAR_CART
  } from "./ActionType";
  
  export const createOrder = (reqData) => async (dispatch) => {
    console.log("req_data",reqData)
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const data = await api.post("/order/create", reqData.address);
    

      if(data.data.data.id){
    
        reqData.navigate(`/checkout/orderSummary/${data.data.data.id}`);
      }

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
    }
  };
  
  export const getOrderById = (reqData) => async (dispatch) => {
    const orderId=reqData.orderId
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });

    try {
      const response = await api.get(`/order/${orderId}`);

      dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
    }
  };
  

  export const confirmOrder=(orderId)=> async (dispatch) =>{
    dispatch({type:CONFIRM_ORDER_SUCCESS});

    try {
      console.log("orderiddd",orderId)
      const response=await api.post(`/order/confirm/${orderId}`)
      dispatch({type:CONFIRM_ORDER_SUCCESS,payload:response})
      console.log("123checkingg",response)
    } catch (error) {
      dispatch({type:CONFIRM_ORDER_FAILURE,payload:error.message})
    }
  }