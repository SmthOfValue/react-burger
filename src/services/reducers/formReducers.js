import { FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_FORM_SET_VALUE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from "../actions/forgotPassword";

const forgotPasswordFormInitialState = {
    form: {
        email: ''
    },
    forgotPasswordRequest: false,
    forgotPasswordError: false
};

export const forgotPasswordReducer = (state = forgotPasswordFormInitialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    email: action.payload
                } 
            };
        }
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true
            };
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordError: false
            };
        }
        case FORGOT_PASSWORD_ERROR: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordError: true
            };
        }
        default: {
            return state;
        }
    }
};