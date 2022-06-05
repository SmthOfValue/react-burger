import { combineReducers } from 'redux';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    INCREASE_INGREDIENT_COUNT,
    DECREASE_INGREDIENT_COUNT,
    SET_BUNS_COUNT
} from '../actions/ingredients.js';
import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
    SET_ORDER_MODAL,
    RESET_ORDER_MODAL
} from '../actions/orderDetails.js';
import {
    SET_INGREDIENT_MODAL,
    RESET_INGREDIENT_MODAL
} from '../actions/ingredientDetails.js';
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT
} from '../actions/burgerConstructor.js'
import { generateID } from '../../utils/utils.js';

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
    orderError: false,
    modalIsOpen: false
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
        case INCREASE_INGREDIENT_COUNT: {
            return {
                ...state,
                ingredients: [...state.ingredients].map(ingredient => ingredient._id === action.id ? {...ingredient, __v: ++ingredient.__v} : ingredient)
            }
        } 
        case DECREASE_INGREDIENT_COUNT: {
            return {
                ...state,
                ingredients: [...state.ingredients].map(ingredient => ingredient._id === action.id ? {...ingredient, __v: --ingredient.__v} : ingredient)
            }
        }
        case SET_BUNS_COUNT: {
            return {
                ...state,
                ingredients: [...state.ingredients].map(ingredient => ingredient.type !== "bun" 
                ? ingredient 
                : ingredient._id !== action.id 
                ? {...ingredient, __v: 0} 
                : {...ingredient, __v: 1} )
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
            if (action.payload.type === "bun") {
                return {
                    ...state,
                    bun: {
                        ...action.payload,
                        constructorId: generateID()
                    }
                };
            }
            else {
                return {
                    ...state,
                    data: [...state.data, 
                        {
                            ...action.payload,
                            constructorId: generateID()
                        }
                    ]
                }
            }
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                data: state.data.filter(ingredient => ingredient.constructorId !== action.constructorId)
            }
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
        case SET_ORDER_MODAL: {
            return {
                ...state,
                modalIsOpen: true
            }
        }
        case RESET_ORDER_MODAL: {
            return {
                ...state,
                modalIsOpen: orderInitialState.modalIsOpen
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