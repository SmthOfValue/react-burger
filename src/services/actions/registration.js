import {submitRegistrationRequest} from '../../utils/burger-api.js';
import {setCookie} from '../../utils/utils.js';

export const REGISTRATION_FORM_SET_VALUE = "REGISTRATION_FORM_SET_VALUE";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_ERROR = "REGISTRATION_ERROR";

export const setRegistrationFormValue = (field, value) => {
    return {
        type: REGISTRATION_FORM_SET_VALUE,
        field,
        value             
    }
}

export const submitRegisration = (email, password, name) => {
    return function(dispatch) {
        dispatch({
            type: REGISTRATION_REQUEST
        });
        submitRegistrationRequest(email, password, name)
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: REGISTRATION_SUCCESS,
                    payload: res.user
                });
                let accessToken;
                accessToken = res.accessToken.split('Bearer ')[1];
                
                if (accessToken) {                  
                    setCookie('accessToken', accessToken);
                }
                localStorage.setItem('refreshToken', res.refreshToken);
            } else {
                dispatch({
                    type: REGISTRATION_ERROR
                });
            }
        })
        .catch(error => dispatch({
            type: REGISTRATION_ERROR
        })
        );
    };
}