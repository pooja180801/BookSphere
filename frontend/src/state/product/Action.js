import { api } from "../../config/apiConfig";
import { FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS } from "./ActionType";


export const findProducts=()=>async(dispatch)=>{
    dispatch({type:FIND_PRODUCTS_REQUEST})
  
    try {
      const response=await api.get(`/books/filter`)
      const data = response.data.data; 
      console.log("received", data);

      dispatch({type:FIND_PRODUCTS_SUCCESS,payload:data})
    } catch (error) {
        console.error("Error fetching products:", error);
        dispatch({type:FIND_PRODUCTS_FAILURE,payload:error.message})
    }
}

export const findProductsById=(reqData)=>async(dispatch)=>{
    dispatch({type:FIND_PRODUCT_BY_ID_REQUEST})
    const {bookId}=reqData;
    console.log("id",bookId)
    try {
      const data=await api.get(`/books/viewById/${bookId}`)

      console.log("data",data)
      dispatch({type:FIND_PRODUCT_BY_ID_SUCCESS,payload:data.data})
    } catch (error) {
        dispatch({type:FIND_PRODUCT_BY_ID_FAILURE,payload:error.message})
    }
}