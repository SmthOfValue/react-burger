import { NORMA_API } from './constants.js';
import {getCookie} from './utils';
import {
    TOrder,
    TUser,
    TTokens,
    TIngredient
} from './types';

type TServerResponse<T> = T & { success: boolean; };


const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

type TIngredientsResponse = TServerResponse<{
    data: TIngredient[];
}>;

//запрос на получение списка ингредиентов
const getIngredientsRequest = (): Promise<TIngredientsResponse> => {
    return fetch(`${NORMA_API}/ingredients`)
        .then(res => checkResponse(res))
};

type TNewOrderResponse = TServerResponse<{
    order: TOrder;
    name: string;
}>;

//запрос на оформление заказа
const getOrderNumber = (ingredientsIdArray: string[]): Promise<TNewOrderResponse> => {
    return fetch(`${NORMA_API}/orders`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: getCookie('token') ? `Bearer ${getCookie('token')}` : ''
        },
        method: 'POST',
        body: JSON.stringify({ "ingredients": ingredientsIdArray })
    })
        .then(res => checkResponse(res))
};

type TMessageResponse = TServerResponse<{ message: string }>

//запрос на сброс пароля с отправкой email
const submitForgotPasswordRequest = (email: string): Promise<TMessageResponse> => {
    return fetch(`${NORMA_API}/password-reset`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        method: 'POST',
        body: JSON.stringify({ "email": email })
    })
        .then(res => checkResponse(res))
};

//запрос на установку нового пароля
const submitResetPasswordRequest = (password: string, token: string): Promise<TMessageResponse> => {
    return fetch(`${NORMA_API}/password-reset/reset`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        method: 'POST',
        body: JSON.stringify({
            "password": password,
            "token": token 
        })
    })
        .then(res => checkResponse(res))
}

type TAuthResponse = TServerResponse<{user: TUser} & TTokens>;

//запрос на регистрацию пользователя
const submitRegistrationRequest = (email: string, password: string, name: string): Promise<TAuthResponse> => {
    return fetch(`${NORMA_API}/auth/register`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password,
            "name": name 
        })
    })
    .then(res => checkResponse(res))
}

//запрос на авторизацию пользователя
const submitLoginRequest = (email: string, password: string): Promise<TAuthResponse> => {
    return fetch(`${NORMA_API}/auth/login`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password 
        })
    })
    .then(res => checkResponse(res))
}

export type TUserInfoResponse = TServerResponse<{user: TUser}>;

const getUserInfoRequest = (): Promise<TUserInfoResponse> => {
    return fetch(`${NORMA_API}/auth/user`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: getCookie('token') ? `Bearer ${getCookie('token')}` : '',
        },
        method: 'GET'
    })
    .then(res => checkResponse(res))
}

const setUserInfoRequest = (email: string, password: string, name: string): Promise<TUserInfoResponse> => {
    return fetch(`${NORMA_API}/auth/user`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: getCookie('token') ? `Bearer ${getCookie('token')}` : '',
        },
        method: 'PATCH',
        body: JSON.stringify({
            "email": email,
            "password": password,
            "name": name 
        })
    })
    .then(res => checkResponse(res))
}

type TTokenResponse = TServerResponse<TTokens>;
const refreshTokenRequest = (): Promise<TTokenResponse> => {
    const refreshToken = localStorage.getItem('refreshToken');
    return fetch(`${NORMA_API}/auth/token`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "token": refreshToken
        })
    })
    .then(res => checkResponse(res))
}

const logoutRequest = (): Promise<TMessageResponse> => {
    const refreshToken = localStorage.getItem('refreshToken'); 
    return fetch(`${NORMA_API}/auth/logout`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "token": refreshToken
        })
    })
    .then(res => checkResponse(res))
}



export {
    getIngredientsRequest,
    getOrderNumber,
    submitForgotPasswordRequest,
    submitResetPasswordRequest,
    submitRegistrationRequest,
    submitLoginRequest,
    getUserInfoRequest,
    setUserInfoRequest,
    refreshTokenRequest,
    logoutRequest
};