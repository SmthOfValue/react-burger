import {submitRegistrationRequest} from '../../utils/burger-api';
import {setTokens} from '../../utils/utils';
import { resetForm } from './forms';

export const REGISTRATION_FORM_SET_VALUE: "REGISTRATION_FORM_SET_VALUE" = "REGISTRATION_FORM_SET_VALUE";

export const REGISTRATION_REQUEST: "REGISTRATION_REQUEST" = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS" = "REGISTRATION_SUCCESS";
export const REGISTRATION_ERROR: "REGISTRATION_ERROR" = "REGISTRATION_ERROR";

interface ISetRegistrationFormValue {
    type: typeof REGISTRATION_FORM_SET_VALUE;
    field: string;
    value: string;
}

export const setRegistrationFormValue = (field: string, value: string): ISetRegistrationFormValue => {
    return {
        type: REGISTRATION_FORM_SET_VALUE,
        field,
        value             
    }
}

export const submitRegistration = (email: string, password: string, name: string) => {
    return function(dispatch: any) {
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
                setTokens(res.accessToken, res.refreshToken);
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