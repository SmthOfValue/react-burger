import {
    REGISTRATION_ERROR,
    REGISTRATION_SUCCESS,
    REGISTRATION_REQUEST,
    REGISTRATION_FORM_SET_VALUE
} from "../actions/registration";
import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_FORM_SET_VALUE
} from "../actions/login";
import {
    PROFILE_ERROR,
    PROFILE_FORM_SET_VALUE,
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    LOGOUT_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS
} from '../actions/profile';
import {
    FORM_RESET,
    TFormsActions
} from '../actions/forms';
import type { TRegistrationActions } from '../actions/registration';
import type { TProfileActions } from "../actions/profile";
import type { TLoginActions } from "../actions/login";

type TRegistrationFormState = {
    form: {
        email: string;
        password: string;
        name: string
    };
}

const registrationFormInitialState: TRegistrationFormState = {
    form: {
        email: '',
        password: '',
        name: ''
    }    
}

type TLoginFormState = {
    form: {
        email: string;
        password: string;
    };
};

const loginFormInitialState: TLoginFormState = {
    form: {
        email: '',
        password: ''
    }    
}

type TProfileFormState = {
    form: {
        email: string;
        password: string;
        name: string;
    };
}

const profileFormInitialState: TProfileFormState = {
    form: {
        email: '',
        password: '',
        name: ''
    }
}

type TUserState = {
    email: string;
    name: string;
    isAuth: boolean;

    registerRequest: boolean;
    registerError: boolean;

    loginRequest: boolean;
    loginError: boolean;

    profileUpdateRequest: boolean;
    profileUpdateError: boolean;
    
    tokenRefreshRequest: boolean;
    tokenRefreshError: boolean;

    logoutRequest: boolean;
    logoutError: boolean;
};

const userInitialState: TUserState = {
    email: '',
    name: '',

    isAuth: false,

    registerRequest: false,
    registerError: false,

    loginRequest: false,
    loginError: false,

    profileUpdateRequest: false,
    profileUpdateError: false,
    
    tokenRefreshRequest: false,
    tokenRefreshError: false,

    logoutRequest: false,
    logoutError: false
}

export const profileFormReducer = (state = profileFormInitialState, action: TProfileActions): TProfileFormState => {
    switch (action.type) {
        case PROFILE_FORM_SET_VALUE: {
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

export const registrationFormReducer = (state = registrationFormInitialState, action: TRegistrationActions | TFormsActions): TRegistrationFormState => {
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
        case FORM_RESET: {
            return registrationFormInitialState;
        }
        default: {
            return state;
        }
    }
};

export const loginFormReducer = (state = loginFormInitialState, action: TLoginActions | TFormsActions) => {
    switch (action.type) {
        case LOGIN_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                } 
            };
        }
        case FORM_RESET: {
            return loginFormInitialState;
        }
        default: {
            return state;
        }
    }
};

export const userReducer = (state = userInitialState, action: TProfileActions | TFormsActions | TRegistrationActions | TLoginActions): TUserState => {
    switch (action.type) {
        case PROFILE_REQUEST: {
            return {
                ...state,
                profileUpdateRequest: true
            };
        }
        case PROFILE_SUCCESS: {
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                isAuth: true,
                profileUpdateRequest: false,
                profileUpdateError: false
            };
        }
        case PROFILE_ERROR: {
            return {
                ...state,
                profileUpdateRequest: false,
                profileUpdateError: true
            };
        }
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
                isAuth: true,
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
        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                isAuth: true,
                loginRequest: false,
                loginError: false
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                loginRequest: false,
                loginError: true
            };
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true
            };
        }
        case LOGOUT_SUCCESS: {
            return userInitialState;
        }
        case LOGOUT_ERROR: {
            return {
                ...state,
                logoutRequest: false,
                logoutError: true
            };
        }
        default: {
            return state;
        }
    }
}