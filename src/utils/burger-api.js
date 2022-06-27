
import { NORMA_API } from './constants.js';

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

export {getIngredientsRequest, getOrderNumber, submitForgotPasswordRequest, submitResetPasswordRequest, submitRegistrationRequest};