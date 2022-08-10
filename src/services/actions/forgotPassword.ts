import {submitForgotPasswordRequest} from '../../utils/burger-api';
import { resetForm } from './forms';
import { RouteComponentProps } from 'react-router-dom';

export const FORGOT_PASSWORD_FORM_SET_VALUE: "FORGOT_PASSWORD_FORM_SET_VALUE" = "FORGOT_PASSWORD_FORM_SET_VALUE";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR: "FORGOT_PASSWORD_ERROR" = "FORGOT_PASSWORD_ERROR";

interface ISetForgotPasswordFormValueAction {
    readonly type: typeof FORGOT_PASSWORD_FORM_SET_VALUE;
    payload: string;
}

export const setForgotPasswordFormValue = (value: string): ISetForgotPasswordFormValueAction => {
    return {
        type: FORGOT_PASSWORD_FORM_SET_VALUE,
        payload: value             
    }
}

interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
};

interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
};

interface IForgotpasswordErrorAction {
    readonly type: typeof FORGOT_PASSWORD_ERROR;
};

export const submitForgotPassword = (email: string, history: RouteComponentProps['history']) => {
    return function(dispatch: any) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        submitForgotPasswordRequest(email)
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS
                });
                dispatch(resetForm());
                history.push({
                    pathname: "/reset-password",
                    state: {
                        isEmailSent: true
                    }
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

export type TForgotPasswordActions = 
    | ISetForgotPasswordFormValueAction
  | IForgotPasswordRequestAction
  | IForgotPasswordSuccessAction
  | IForgotpasswordErrorAction;