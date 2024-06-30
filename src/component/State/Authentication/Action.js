import axios from "axios"
import { API_URL, api } from "../../config/api"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
export const registerUser=(reqDate) =>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data}= await axios.post(`${API_URL}/auth/signup`,reqDate.userData)
        if(data.jwt)localStorage.setItem("jwt",data.jwt);
        if(data.role==="ROLE_MANAGER"){
            reqDate.navigate("/admin/jewelry")
        }
        else{
            reqDate.navigate("/")
        }
        dispatch({type:REGISTER_SUCCESS,payload:data.jwt})
        console.log("register success",data)
    
    } catch(error){
        dispatch({type:REGISTER_FAILURE,payload:error})
        console.log(error,error)
    }
    }

export const loginUser = (reqDate) => async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            const { data } = await axios.post(`${API_URL}/auth/signin`, reqDate.userData);
            if (data.jwt) localStorage.setItem("jwt", data.jwt);
            if (data.role === "ROLE_MANAGER") {
                reqDate.navigate("/admin/jewelry");
            } else {
                reqDate.navigate("/");
            }
            dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
            console.log("login success")
        } catch (error) {
            let errorMessage = "An error occurred during login. Please try again.";
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                errorMessage = "Incorrect username or password, or access denied. Please try again.";
            }
            dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
            console.log(error, errorMessage);
        }
    };

export const getUser=(jwt)=> async(dispatch)=> {
    dispatch({type:GET_USER_REQUEST})
    try {
        const {data} = await api.get(`/users/profile`, {
            headers:{
                Authorization :`Bearer ${jwt}`
            }
        })
        dispatch({type:GET_USER_SUCCESS,payload:data })
        console.log("user profile",data)
    }  catch (error) {
        dispatch({type:GET_USER_FAILURE,payload:error })
        console.log("error",error)
 }
}


export const logout=()=>async(dispatch)=>{
        dispatch({type:LOGOUT})
        try {
            localStorage.clear();
            dispatch({type :LOGOUT})
            console.log("logout success")
        }catch (error) {
            console.log("error",error)
        }
    }