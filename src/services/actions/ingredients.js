import { getIngredientsRequest } from '../../utils/burger-api.js';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const INCREASE_INGREDIENT_COUNT = 'INCREASE_INGREDIENT_COUNT';
export const DECREASE_INGREDIENT_COUNT = 'DECREASE_INGREDIENT_COUNT';
export const SET_BUNS_COUNT = 'SET_BUNS_COUNT';

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getIngredientsRequest()
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                });
            } else {
                dispatch({
                    type: GET_INGREDIENTS_ERROR
                });
            }
        })
        .catch(error => dispatch(
            {
                type: GET_INGREDIENTS_ERROR
            }
        ));
    };
}

export const decreaseIngredientCount = (id) => {
    return {
        type: DECREASE_INGREDIENT_COUNT,
        id
    }
}

export const setBunsCount = (id) => {
    return {
        type: SET_BUNS_COUNT,
        id
    }
}

export const increaseIngredientCount = (id) => {
    return {
        type: INCREASE_INGREDIENT_COUNT,
        id
    }
}