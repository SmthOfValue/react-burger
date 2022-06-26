import {submitForgotPasswordRequest} from '../../utils/burger-api.js';

export const FORGOT_PASSWORD_FORM_SET_VALUE = "FORGOT_PASSWORD_FORM_SET_VALUE";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_ERROR";

export const setForgotPasswordFormValue = (value) => {
    return {
        type: FORGOT_PASSWORD_FORM_SET_VALUE,
        payload: value             
    }
}

export const submitForgotPassword = (email) => {
    return function(dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        submitForgotPasswordRequest(email)
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS
                });
            } else {
                dispatch({
                    type: FORGOT_PASSWORD_ERROR
                });
            }
        })
        .catch(error => dispatch({
            type: FORGOT_PASSWORD_ERROR
        })
        );
    };
}