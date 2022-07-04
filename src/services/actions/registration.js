import {submitRegistrationRequest} from '../../utils/burger-api.js';
import {setTokens} from '../../utils/utils.js';
import { resetForm } from './forms.js';

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

export const submitRegistration = (email, password, name) => {
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
                dispatch(resetForm());
                setTokens(res);
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