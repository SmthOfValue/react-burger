
import { NORMA_API } from './constants.js';
import {getCookie} from './utils.js';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

//запрос на получение списка ингредиентов
const getIngredientsRequest = () => {
    return fetch(`${NORMA_API}/ingredients`)
        .then(res => checkResponse(res))
};

//запрос на оформление заказа
const getOrderNumber = (ingredientsIdArray) => {
    return fetch(`${NORMA_API}/orders`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        method: 'POST',
        body: JSON.stringify({ "ingredients": ingredientsIdArray })
    })
        .then(res => checkResponse(res))
};

//запрос на сброс пароля с отправкой email
const submitForgotPasswordRequest = (email) => {
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
const submitResetPasswordRequest = (password, token) => {
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

//запрос на регистрацию пользователя
const submitRegistrationRequest = (email, password, name) => {
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
const submitLoginRequest = (email, password) => {
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

const getUserInfoRequest = () => {
    return fetch(`${NORMA_API}/auth/user`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: getCookie('token') ? `Bearer ${getCookie('token')}` : '',
        },
        method: 'GET'
    })
    .then(res => checkResponse(res))
}

const setUserInfoRequest = (email, password, name) => {
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

const refreshTokenRequest = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log(refreshToken);
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



export {
    getIngredientsRequest,
    getOrderNumber,
    submitForgotPasswordRequest,
    submitResetPasswordRequest,
    submitRegistrationRequest,
    submitLoginRequest,
    getUserInfoRequest,
    setUserInfoRequest,
    refreshTokenRequest
};