import { 
    FIND_PRODUCTS_FAILURE, 
    FIND_PRODUCTS_REQUEST, 
    FIND_PRODUCTS_SUCCESS, 
    FIND_PRODUCT_BY_ID_FAILURE, 
    FIND_PRODUCT_BY_ID_REQUEST, 
    FIND_PRODUCT_BY_ID_SUCCESS, 
    SEARCH_PRODUCTS_FAILURE, 
    SEARCH_PRODUCTS_REQUEST,
    SEARCH_PRODUCTS_SUCCESS
  } from "./ActionType"
  
  const initialState = {
    productsByGenre: {}, 
    product: null,
    loading: false,
    error: null,
    products:[]
  }
  
  export const productReducer = (state = initialState, action) => {
    switch(action.type) {
      case FIND_PRODUCTS_REQUEST:
      case FIND_PRODUCT_BY_ID_REQUEST:
      case SEARCH_PRODUCTS_REQUEST:
        return { ...state, loading: true, error: null }
  
      case FIND_PRODUCTS_SUCCESS:
        return { ...state, loading: false, error: null, productsByGenre: action.payload } 

      case SEARCH_PRODUCTS_SUCCESS:
        return { ...state,loading:null,error:null,products:action.payload}
  
      case FIND_PRODUCT_BY_ID_SUCCESS:
        return { ...state, loading: false, error: null, product: action.payload }
  
      case FIND_PRODUCTS_FAILURE:
      case FIND_PRODUCT_BY_ID_FAILURE:
      case SEARCH_PRODUCTS_FAILURE:
        return { ...state, loading: false, error: action.payload }
  
      default:
        return state;
    }
  }
  