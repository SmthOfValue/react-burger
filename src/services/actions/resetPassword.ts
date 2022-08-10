import {submitResetPasswordRequest} from '../../utils/burger-api';
import { resetForm } from './forms';

export const RESET_PASSWORD_FORM_SET_VALUE: "RESET_PASSWORD_FORM_SET_VALUE" = "RESET_PASSWORD_FORM_SET_VALUE";

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR: "RESET_PASSWORD_ERROR" = "RESET_PASSWORD_ERROR";

interface ISetResetPasswordFormValueAction {
    readonly type: typeof RESET_PASSWORD_FORM_SET_VALUE;
    field: string;
    value: string;
};

interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST
}

interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS
}

interface IResetPasswordErrorAction {
    readonly type: typeof RESET_PASSWORD_ERROR
}

export const setResetPasswordFormValue = (field: string, value: string): ISetResetPasswordFormValueAction => {
    return {
        type: RESET_PASSWORD_FORM_SET_VALUE,
        field,
        value             
    }
}

export const submitResetPassword = (password: string, token: string) => {
    return function(dispatch: any) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        submitResetPasswordRequest(password, token)
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS
                });
                dispatch(resetForm());
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

export type TResetPasswordActions = 
    | ISetResetPasswordFormValueAction
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordErrorAction;