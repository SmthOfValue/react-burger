import { RESET_PASSWORD_FORM_SET_VALUE, RESET_PASSWORD_REQUEST,  RESET_PASSWORD_ERROR, RESET_PASSWORD_SUCCESS} from "../actions/resetPassword";



const resetPasswordFormInitialState = {
    form: {
        password: '',
        token: ''
    },
    resetPasswordRequest: false,
    resetPasswordError: false
};




export const resetPasswordReducer = (state = resetPasswordFormInitialState, action) => {
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
                resetPasswordError: false
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