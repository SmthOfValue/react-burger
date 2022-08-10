import {
    RESET_PASSWORD_FORM_SET_VALUE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_ERROR,
    RESET_PASSWORD_SUCCESS
} from "../actions/resetPassword";
import { FORM_RESET, TFormsActions } from "../actions/forms";
import type { TResetPasswordActions } from "../actions/resetPassword";

type TResetPasswordState = {
    form: {
        password: string;
        token: string;
    }
    resetPasswordRequest: boolean;
    resetPasswordError: boolean;
    passwordResetSuccess: boolean;
}

const resetPasswordFormInitialState: TResetPasswordState = {
    form: {
        password: '',
        token: ''
    },
    resetPasswordRequest: false,
    resetPasswordError: false,
    passwordResetSuccess: false
};




export const resetPasswordReducer = (state = resetPasswordFormInitialState, action: TResetPasswordActions | TFormsActions): TResetPasswordState => {
    switch (action.type) {
        case RESET_PASSWORD_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                } 
            };
        }
        case FORM_RESET: {
            return resetPasswordFormInitialState;
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordError: false,
                passwordResetSuccess: true
            };
        }
        case RESET_PASSWORD_ERROR: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordError: true
            };
        }
        default: {
            return state;
        }
    }
};