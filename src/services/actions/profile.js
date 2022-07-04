import { getUserInfoRequest, setUserInfoRequest, refreshTokenRequest } from "../../utils/burger-api";
import { setTokens, getCookie } from "../../utils/utils";

//export const SET_USER_INFO = "SET_USER_INFO";
export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCESS";
export const PROFILE_ERROR = "PROFILE_ERROR";

export const PROFILE_FORM_SET_VALUE = "PROFILE_FORM_SET_VALUE";

export const setProfileFormValue = (field, value) => {
    return {
        type: PROFILE_FORM_SET_VALUE,
        field,
        value             
    }
}


// export const submitRefreshToken = () => {
//     refreshTokenRequest()
//     .then(res => {
//         if (res && res.success) {
//             setTokens(res);
//         }
//     })
//     .catch(error => console.log(error));
// }

//функция обертка для запросов с обработкой случаев, когда истек срок годности токена
export const fetchWithRefresh = (callback, params) => {
    return callback(params)
    .then(res => res)
    .catch(error => {
        if (error.message !== "jwt expired") {
         return Promise.reject(error);
        } else {
            return refreshTokenRequest()
            .then(res => {
                if (res && res.success) {
                    setTokens(res);
                   return Promise.resolve(callback(params))
                }
            })
            .catch(error => {
                console.log(error);
               return Promise.reject(error.message);
            });
        }
    });
}

export const getUserInfo = () => {
    
        return function(dispatch) {
            dispatch({
                type: PROFILE_REQUEST
            });
            fetchWithRefresh(getUserInfoRequest)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: PROFILE_SUCCESS,
                        payload: res.user
                    });                
                } else {
                    dispatch({
                        type: PROFILE_ERROR
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: PROFILE_ERROR
                });
            }
            );
        };
}

export const setUserInfo = (email, password, name) => {
    return function(dispatch) {
        dispatch({
            type: PROFILE_REQUEST
        });
        fetchWithRefresh(setUserInfoRequest(email, password, name))
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: PROFILE_SUCCESS,
                    payload: res.user
                });
            } else {
                dispatch({
                    type: PROFILE_ERROR
                });
            }
        })
        .catch(error => {
            dispatch({
                type: PROFILE_ERROR
            });
        });
    };
}

