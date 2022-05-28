
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

export {getIngredientsRequest, getOrderNumber};