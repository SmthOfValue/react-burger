import {submitResetPasswordRequest} from '../../utils/burger-api.js';

export const RESET_PASSWORD_FORM_SET_VALUE = "RESET_PASSWORD_FORM_SET_VALUE";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";

export const setResetPasswordFormValue = (field, value) => {
    return {
        type: RESET_PASSWORD_FORM_SET_VALUE,
        field,
        value             
    }
}

export const submitResetPassword = (password, token) => {
    return function(dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        submitResetPasswordRequest(password, token)
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS
                });
            } else {
                dispatch({
                    type: RESET_PASSWORD_ERROR
                });
            }
        })
        .catch(error => dispatch({
            type: RESET_PASSWORD_ERROR
        })
        );
    };
}