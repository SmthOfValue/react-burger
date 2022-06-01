import { combineReducers } from 'redux';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR 
} from '../actions/ingredients.js';
import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR
} from '../actions/orderDetails.js';
import {
    SET_INGREDIENT_MODAL,
    RESET_INGREDIENT_MODAL
} from '../actions/ingredientDetails.js';
import {
    ADD_INGREDIENT
} from '../actions/burgerConstructor.js'

const ingredientsInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,
}

const constructorInitialState = {
    bun: {},
    data: []
}

const detailedIngredientInitialState = {
    ingredientInModal: {},
    modalIsOpen: false
}

const orderInitialState = {
    order: {},
    orderRequest: false,
    orderError: false
}


const ingredientsReducer = (state = ingredientsInitialState, action) => {
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

const constructorReducer = (state = constructorInitialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {
                ...state,
                bun: action.constructorIngredients.bun,
                data: action.constructorIngredients.data
            };
        }
        default: {
            return state;
        }
    }
}

const detailedIngredientReducer = (state = detailedIngredientInitialState, action) => {
    switch (action.type) {
        case SET_INGREDIENT_MODAL: {
            return {
                ...state,
                ingredientInModal: action.payload,
                modalIsOpen: true
            };            
        }
        case RESET_INGREDIENT_MODAL: {
            return {
                ...state,
                ingredientInModal: detailedIngredientInitialState.ingredientInModal,
                modalIsOpen: false
            };
        }
        default: {
            return state;
        }
    }    
}

const orderReducer = (state = orderInitialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            };            
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                order: action.order,
                orderRequest: false,
                orderError: false
            };
        }
        case GET_ORDER_ERROR: {
            return {
                ...state,
                orderRequest: false,
                orderError: true
            }
        }
        default: {
            return state;
        }
    }
}

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorReducer,
    detailedIngredient: detailedIngredientReducer,
    order: orderReducer
}) 

export {rootReducer};