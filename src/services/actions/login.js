import {submitLoginRequest} from '../../utils/burger-api.js';
import {setTokens} from '../../utils/utils.js';
import { resetForm } from './forms.js';

export const LOGIN_FORM_SET_VALUE = "LOGIN_FORM_SET_VALUE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const setLoginFormValue = (field, value) => {
    return {
        type: LOGIN_FORM_SET_VALUE,
        field,
        value             
    }
}

export const submitLogin = (email, password) => {
    return function(dispatch) {
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
                setTokens(res);
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