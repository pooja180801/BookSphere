import axios from "axios"
import { API_BASE_URL } from "../../config/apiConfig"
import { FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS,SEARCH_PRODUCTS_SUCCESS,SEARCH_PRODUCTS_REQUEST, SEARCH_PRODUCTS_FAILURE } from "./ActionType";


export const findProducts=()=>async(dispatch)=>{
    dispatch({type:FIND_PRODUCTS_REQUEST})
  
    try {
      const response=await axios.get(`${API_BASE_URL}/books/filter`)
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
      const data=await axios.get(`${API_BASE_URL}/books/viewById/${bookId}`)

      console.log("data",data)
      dispatch({type:FIND_PRODUCT_BY_ID_SUCCESS,payload:data.data})
    } catch (error) {
        dispatch({type:FIND_PRODUCT_BY_ID_FAILURE,payload:error.message})
    }
}

export const searchProducts=(searchKey)=>async(dispatch)=>{
  dispatch({type:SEARCH_PRODUCTS_REQUEST})
  
  try{
    const data=await axios.get(`${API_BASE_URL}/books/search/${searchKey}`)
    console.log("searchpro",data.data)
    dispatch({type:SEARCH_PRODUCTS_SUCCESS,payload:data.data})
  }catch(error){
    console.error("Error while fetching data:", error);
    dispatch({type:SEARCH_PRODUCTS_FAILURE,payload:error.message})
  }
}