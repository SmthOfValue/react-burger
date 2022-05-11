import { NORMA_API } from './constants.js';

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const getIngredients = () => {
    return fetch(`${NORMA_API}/ingredients`)
        .then(res => checkResponse(res))
};

export {getIngredients};