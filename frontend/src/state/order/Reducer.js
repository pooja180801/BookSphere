import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    CONFIRM_ORDER_REQUEST,
    CONFIRM_ORDER_SUCCESS,
    CONFIRM_ORDER_FAILURE,
    CLEAR_CART
  } from "./ActionType";
  
  const initialState = {
    order: null,
    orders:[],
    loading: false,
    error: null,
  };
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
      case CONFIRM_ORDER_REQUEST:
        return { ...state, loading: true, error: null };
  
      case CREATE_ORDER_SUCCESS:
      case CONFIRM_ORDER_SUCCESS:
        return { ...state, loading: false, error: null, order: action.payload };
  
      case GET_ORDER_BY_ID_SUCCESS:
        return { ...state, loading: false, error: null, order: action.payload };
  
      case CREATE_ORDER_FAILURE:
      case GET_ORDER_BY_ID_FAILURE:
      case CONFIRM_ORDER_FAILURE:
        return { ...state, loading: false, error: action.payload };

      case GET_ORDER_BY_ID_REQUEST:
        return{...state,loading:true,error:null}
  
      default:
        return state;
    }
  };
  