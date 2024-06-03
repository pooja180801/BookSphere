import { updateCartItem } from "./Action";
import { 
    ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, ADD_ITEM_TO_CART_FAILURE,
    GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAILURE,
    REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, REMOVE_CART_ITEM_FAILURE,
    UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE 
} from "./ActionType";

const initialState = {
    cart: [],
    loading: false,
    error: null,
    cartItems:[]
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART_REQUEST:
            return { ...state, loading: true, error: null };

        case ADD_ITEM_TO_CART_SUCCESS:
            return { ...state, loading: false, cartItems:[...state.cartItems, action.payload] };


        case ADD_ITEM_TO_CART_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case GET_CART_REQUEST:
            return{...state,loading:true,error:null}

        
        case GET_CART_SUCCESS:
            return { ...state, loading: false, error: null, cartItems:action.payload ,cart:action.payload};

         case GET_CART_FAILURE:
                return { ...state, loading: false, error: action.payload };
        
                case REMOVE_CART_ITEM_REQUEST:
                case UPDATE_CART_ITEM_REQUEST:{
                    return {...state,loading:true,error:null}
                }

        case REMOVE_CART_ITEM_SUCCESS:
            return{...state,
                deletedCartItem:action.payload,
                loading:false}


            case UPDATE_CART_ITEM_SUCCESS:
                return {...state,updatedCartItem:action.payload,
               loading:false}

        case REMOVE_CART_ITEM_FAILURE:
        case UPDATE_CART_ITEM_FAILURE:
            return{...state,error:action.payload,loading:false}
    

        default:
            return state;
    }
};
