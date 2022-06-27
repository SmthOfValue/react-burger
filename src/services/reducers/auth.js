import { REGISTRATION_ERROR, REGISTRATION_SUCCESS, REGISTRATION_REQUEST, REGISTRATION_FORM_SET_VALUE } from "../actions/registration";

const registrationFormInitialState = {
    form: {
        email: '',
        password: '',
        name: ''
    }    
}

const userInitialState = {
    email: '',
    password: '',
    name: '',
    isAuth: false,
    registerRequest: false,
    registerError: false
}

export const registrationFormReducer = (state = registrationFormInitialState, action) => {
    switch (action.type) {
        case REGISTRATION_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                } 
            };
        }
        default: {
            return state;
        }
    }
};

export const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case REGISTRATION_REQUEST: {
            return {
                ...state,
                registerRequest: true
            };
        }
        case REGISTRATION_SUCCESS: {
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                registerRequest: false,
                registerError: false
            };
        }
        case REGISTRATION_ERROR: {
            return {
                ...state,
                registerRequest: false,
                registerError: true
            };
        }
        default: {
            return state;
        }
    }
}