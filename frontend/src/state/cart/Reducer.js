import { 
    ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, ADD_ITEM_TO_CART_FAILURE,
    GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAILURE,
    REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, REMOVE_CART_ITEM_FAILURE,
    UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE ,CLEAR_CART
} from './ActionType';

const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: null,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART_REQUEST:
        case GET_CART_REQUEST:
        case REMOVE_CART_ITEM_REQUEST:
        case UPDATE_CART_ITEM_REQUEST:
            return { ...state, loading: true, error: null };

        case ADD_ITEM_TO_CART_SUCCESS:
            return { ...state, loading: false, cartItems: [...state.cartItems, action.payload] };

        case GET_CART_SUCCESS:
            return { ...state, loading: false, cartItems: action.payload.cartItems, cart: action.payload };

        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.cartItemId !== action.payload),
                loading: false,
            };

        case UPDATE_CART_ITEM_SUCCESS:
            return {
                ...state,
                cartItems: state.cartItems.map(item => item.cartItemId === action.payload.cartItemId ? action.payload : item),
                loading: false,
            };

        case ADD_ITEM_TO_CART_FAILURE:
        case GET_CART_FAILURE:
        case REMOVE_CART_ITEM_FAILURE:
        case UPDATE_CART_ITEM_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case CLEAR_CART:
                return {
                    ...state,
                    cart: [],
                    cartItems: []
                };

        default:
            return state;
    }
};
