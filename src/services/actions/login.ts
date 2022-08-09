import {submitLoginRequest} from '../../utils/burger-api';
import {setTokens} from '../../utils/utils';
import { resetForm } from './forms';

export const LOGIN_FORM_SET_VALUE: "LOGIN_FORM_SET_VALUE" = "LOGIN_FORM_SET_VALUE";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_ERROR: "LOGIN_ERROR" = "LOGIN_ERROR";

interface ISetLoginFormValueAction {
    readonly type: typeof LOGIN_FORM_SET_VALUE;
    field: string;
    value: string;
};

export const setLoginFormValue = (field: string, value: string): ISetLoginFormValueAction => {
    return {
        type: LOGIN_FORM_SET_VALUE,
        field,
        value             
    }
}

export const submitLogin = (email: string, password: string) => {
    return function(dispatch: any) {
        dispatch({
            type: LOGIN_REQUEST
        });
        submitLoginRequest(email, password)
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.user
                });
                dispatch(resetForm());
                setTokens(res.accessToken, res.refreshToken);
            } else {
                dispatch({
                    type: LOGIN_ERROR
                });
            }
        })
        .catch(error => dispatch({
            type: LOGIN_ERROR
        })
        );
    };
}