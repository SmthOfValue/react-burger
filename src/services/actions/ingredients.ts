import { getIngredientsRequest } from '../../utils/burger-api';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';
export const INCREASE_INGREDIENT_COUNT: 'INCREASE_INGREDIENT_COUNT' = 'INCREASE_INGREDIENT_COUNT';
export const DECREASE_INGREDIENT_COUNT: 'DECREASE_INGREDIENT_COUNT' = 'DECREASE_INGREDIENT_COUNT';
export const SET_BUNS_COUNT: 'SET_BUNS_COUNT' = 'SET_BUNS_COUNT';

export function getIngredients() {
    return function(dispatch: any) {
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

interface IDecreaseIngredientCountAction {
    readonly type: typeof DECREASE_INGREDIENT_COUNT;
    readonly id: string;
};

export const decreaseIngredientCount = (id: string): IDecreaseIngredientCountAction => {
    return {
        type: DECREASE_INGREDIENT_COUNT,
        id
    }
}

interface ISetBunsCountAction {
    readonly type: typeof SET_BUNS_COUNT;
    readonly id: string;
};

export const setBunsCount = (id: string): ISetBunsCountAction => {
    return {
        type: SET_BUNS_COUNT,
        id
    }
}

interface IIncreaseIngredientCountAction {
    readonly type: typeof INCREASE_INGREDIENT_COUNT;
    readonly id: string;
};

export const increaseIngredientCount = (id: string): IIncreaseIngredientCountAction => {
    return {
        type: INCREASE_INGREDIENT_COUNT,
        id
    }
}