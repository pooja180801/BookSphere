import axios from "axios"
import { API_BASE_URL } from "../../config/apiConfig"
import { LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
  } from './ActionType';

  import { clearCart } from "../cart/Action";

const token=localStorage.getItem("token");

const registerRequest=()=>({
    type:REGISTER_REQUEST
})

const registerSuccess=(user)=>({
    type:REGISTER_SUCCESS,payload:user
})

const registerFailure=(error)=>({
    type:REGISTER_FAILURE,payload:error
})

export const register=(userData)=>async (dispatch)=>{
    dispatch(clearCart())
    dispatch(registerRequest())
    try {
        const response=await axios.post(`${API_BASE_URL}/user/signup`,userData)
        const user=response.data;

        if(user.token){
            localStorage.setItem("token",user.token)
        }
        console.log("user",user)
        dispatch(registerSuccess(user.token))
        window.location.reload();
    } catch (error) {
        dispatch(registerFailure(error.message))
    }
}



const loginRequest=()=>({
    type:LOGIN_REQUEST
})

const loginSuccess=(user)=>({
    type:LOGIN_SUCCESS,payload:user
})

const loginFailure=(error)=>({
    type:LOGIN_FAILURE,payload:error
})

export const login=(userData)=>async (dispatch)=>{
    dispatch(clearCart())
    dispatch(loginRequest())
    
    try {
        const response=await axios.post(`${API_BASE_URL}/user/signin`,userData)
        const user=response.data;

        if(user.token){
            localStorage.setItem("token",user.token)
        }
        console.log("user",user)
        dispatch(loginSuccess(user.token))
        window.location.reload();
    } catch (error) {
        if (error.response) {
            const errorMessage = error.response.data.error;
            console.log("Server responded with error:", errorMessage);
            dispatch(loginFailure(errorMessage));
        } else {
            console.log("Error setting up the request:", error.message);
            dispatch(loginFailure("Error setting up the request"));
        }
    }
}


const getUserRequest=()=>({
    type:GET_USER_REQUEST
})

const getUserSuccess=(user)=>({
    type:GET_USER_SUCCESS,payload:user
})

const getUserFailure=(error)=>({
    type:GET_USER_FAILURE,payload:error
})

export const getUser=(token)=>async (dispatch)=>{
    dispatch(getUserRequest())
    try {
        const response=await axios.get(`${API_BASE_URL}/user/me`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        const user=response.data;
        console.log("user",user)

        dispatch(getUserSuccess(user))
    } catch (error) {
        dispatch(getUserFailure(error.message))
    }
}



export const logout=()=>(dispatch)=>{
    dispatch(clearCart());
    localStorage.clear();
    dispatch({type:LOGOUT,payload:null})
    window.location.reload();


}


