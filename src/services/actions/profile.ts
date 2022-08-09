import { getUserInfoRequest, setUserInfoRequest, refreshTokenRequest, logoutRequest } from "../../utils/burger-api";
import { setTokens, removeTokens } from "../../utils/utils";
import { TUserInfoResponse } from "../../utils/burger-api";

export const PROFILE_REQUEST: "PROFILE_REQUEST" = "PROFILE_REQUEST";
export const PROFILE_SUCCESS: "PROFILE_SUCESS" = "PROFILE_SUCESS";
export const PROFILE_ERROR: "PROFILE_ERROR" = "PROFILE_ERROR";

export const PROFILE_FORM_SET_VALUE: "PROFILE_FORM_SET_VALUE" = "PROFILE_FORM_SET_VALUE";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR: "LOGOUT_ERROR" = "LOGOUT_ERROR";

interface ISetProfileFormValueAction {
    type: typeof PROFILE_FORM_SET_VALUE;
    field: string;
    value: string;
}

export const setProfileFormValue = (field: string, value: string): ISetProfileFormValueAction => {
    return {
        type: PROFILE_FORM_SET_VALUE,
        field,
        value             
    }
}

type TCallback = () => Promise<TUserInfoResponse>;

//функция обертка для запросов с обработкой случаев, когда истек срок годности токена
export const fetchWithRefresh = (callback: TCallback): Promise<TUserInfoResponse | undefined> => {
        return callback()
        .then(res => res)
        .catch(error => {
            if (error.message !== "jwt expired") {
                return Promise.reject(error);
            } else {
                return refreshTokenRequest()
                .then(res => {
                    if (res && res.success) {
                        setTokens(res.accessToken, res.refreshToken);
                        return Promise.resolve(callback())
                    }
                })
                .catch(error => {
                    return Promise.reject(error.message);
                });
            }
        });
}

export const getUserInfo = () => {
    return function(dispatch: any) {
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

export const setUserInfo = (email: string, password: string, name: string) => {
    return function(dispatch: any) {
        dispatch({
            type: PROFILE_REQUEST
        });
        fetchWithRefresh(() => setUserInfoRequest(email, password, name))
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

export const logout = () => {
    return function(dispatch: any) {
        dispatch({
            type: LOGOUT_REQUEST
        })
        logoutRequest()
        .then(res => {
            if (res && res.success) {
                removeTokens();
                dispatch({
                    type: LOGOUT_SUCCESS
                });                
            } else {
                dispatch({
                    type: LOGOUT_ERROR
                });
            }
        })
        .catch(error => {
            dispatch({
                type: LOGOUT_ERROR
            });
        }
        );
    };
}

