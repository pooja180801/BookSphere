import { api } from "../../config/apiConfig";
import { 
    ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, ADD_ITEM_TO_CART_FAILURE,
    GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAILURE,
    REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, REMOVE_CART_ITEM_FAILURE,
    UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE,CLEAR_CART
} from "./ActionType";

export const addItemToCart = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    try {
      const { data } = await api.put('/cart/add', reqData);
      dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
      dispatch(getCart()); 
    } catch (error) {
      dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
    }
};

export const getCart = () => async (dispatch) => {
    dispatch({type:CLEAR_CART})
    dispatch({ type: GET_CART_REQUEST });
    try {
        const response = await api.get('/cart/');
        const data = response.data.data;
        dispatch({ type: GET_CART_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_CART_FAILURE, payload: error.message });
    }
};

export const removeCartItem = (cartItemId) => async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    try {
        const { data } = await api.delete(`/cartItem/delete/${cartItemId}`);
        dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
        dispatch(getCart()); 
    } catch (error) {
        dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
    }
};

export const updateCartItem = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });
    try {
        const { data } = await api.put(`/cartItem/update/${reqData.cartItemId}`, reqData.data);
        dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
        dispatch(getCart()); 
    } catch (error) {
        dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
    }
};

export const clearCart = () => ({ type: CLEAR_CART });