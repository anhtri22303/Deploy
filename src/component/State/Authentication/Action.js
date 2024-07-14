import axios from "axios"
import { API_URL, api } from "../../config/api"
import { CREATE_USER_FAILURE, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
export const registerUser=(reqDate) =>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data}= await axios.post(`${API_URL}/auth/signup`,reqDate.userData)
        // if(data.jwt)localStorage.setItem("jwt",data.jwt);
        // if(data.role==="ROLE_MANAGER"){
        //     reqDate.navigate("/admin/jewelry")
        // }
        // else{
        //     reqDate.navigate("/")
        //}
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
                reqDate.navigate("/manager/jewelry");
            } else if(data.role === "ROLE_STAFF") {
                reqDate.navigate("/area/:title/:id");
            }else{
                reqDate.navigate("/admin/jewelry");
            }

            dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
            console.log("login success")
        } catch (error) {
            let errorMessage = "An error occurred during login. Please try again.";
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                errorMessage = "Incorrect username or password, or access denied. Please try again.";
            }
            dispatch({ type: LOGIN_FAILURE, payload:  errorMessage });
            console.log(error, errorMessage);
            throw  error;
        }
    };

export const getUser=(jwt)=> async(dispatch)=> {
    dispatch({type:GET_USER_REQUEST})
    try {
        const {data} = await api.get(`/api/users/profile`, {
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

    export const getAllStaffUser=(jwt)=> async(dispatch)=> {
        dispatch({type:GET_ALL_USER_REQUEST})
        try {
            const {data} = await api.get(`/api/users/staff`, {
                headers:{
                    Authorization :`Bearer ${jwt}`
                }
            })
            dispatch({type:GET_ALL_USER_SUCCESS,payload:data })
            console.log("user profile",data)
        }  catch (error) {
            dispatch({type:GET_ALL_USER_FAILURE,payload:error })
            console.log("error",error)
     }
    }

export const createUser = (reqdata,jwt) => {
    return async (dispatch) => {
        dispatch({type:CREATE_USER_REQUEST})
        try{
            const {data} = await api.post(`/api/users/create`, reqdata, {
                headers: {
                    Authorization : `Bearer ${jwt}`,
                },
            });
            dispatch({type:CREATE_USER_SUCCESS, payload:data});
            console.log("created restaurant ", data);
            
        } catch (error) {
            console.log("catch error",error);
            dispatch({type:CREATE_USER_FAILURE, payload:error})
        }
    }
 };
 export const deleteStaffUser = (jwt, username) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    console.log(`Deleting user ${username} with JWT ${jwt}`);
    await axios.delete(`/api/users/${username}`, config);
    console.log(`Deleted user ${username} successfully`);

    // Dispatch an action to update the state
    dispatch({
      type: 'DELETE_USER_SUCCESS',
      payload: username,
    });
  } catch (error) {
    console.error(`Failed to delete user ${username}:`, error.response.data.message);
    dispatch({
      type: 'DELETE_USER_FAILURE',
      payload: error.response.data.message,
    });
  }
};
