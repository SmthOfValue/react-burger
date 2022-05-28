import { combineReducers } from 'redux';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR 
} from '../actions/ingredients.js';

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,

    constructorIngredients: [],
    detailedIngredient: {},
    order: {}
}

const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };            
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false,
                ingredientsError: false
            };
        }
        case GET_INGREDIENTS_ERROR: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsError: true
            }
        }
        default: {
            return state;
        }
    }
}

const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }

}

const detailerIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }    
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

const rootReducer = combineReducers({
    ingredientsReducer,
    constructorReducer,
    detailerIngredientReducer,
    orderReducer
}) 

export {rootReducer};