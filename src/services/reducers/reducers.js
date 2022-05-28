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
    SHOW_INGREDIENT_DETAILS,
    DISCARD_INGREDIENT_DETAILS
} from '../actions/ingredientDetails.js';
import {
    ADD_INGREDIENT
} from '../actions/burgerConstructor.js'

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,

    constructorIngredients: [],
    detailedIngredient: {},

    order: {},
    orderRequest: false,
    orderError: false
}


const rootReducer = (state = initialState, action) => {
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
        case ADD_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: action.constructorIngredients
            };
        }
        case SHOW_INGREDIENT_DETAILS: {
            return {
                ...state,
                detailedIngredient: action.ingredient
            };            
        }
        case DISCARD_INGREDIENT_DETAILS: {
            return {
                ...state,
                detailedIngredient: initialState.detailedIngredient
            };
        }
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

// const constructorReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_INGREDIENT: {
//             return {
//                 ...state,
//                 constructorIngredients: action.constructorIngredients
//             };
//         }
//         default: {
//             return state;
//         }
//     }
// }

// const detailedIngredientReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case SHOW_INGREDIENT_DETAILS: {
//             return {
//                 ...state,
//                 detailedIngredient: action.ingredient
//             };            
//         }
//         case DISCARD_INGREDIENT_DETAILS: {
//             return {
//                 ...state,
//                 detailedIngredient: initialState.detailedIngredient
//             };
//         }
//         default: {
//             return state;
//         }
//     }    
// }

// const orderReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case GET_ORDER_REQUEST: {
//             return {
//                 ...state,
//                 orderRequest: true
//             };            
//         }
//         case GET_ORDER_SUCCESS: {
//             return {
//                 ...state,
//                 order: action.order,
//                 orderRequest: false,
//                 orderError: false
//             };
//         }
//         case GET_ORDER_ERROR: {
//             return {
//                 ...state,
//                 orderRequest: false,
//                 orderError: true
//             }
//         }
//         default: {
//             return state;
//         }
//     }
// }

// const rootReducer = combineReducers({
//     ingredients: ingredientsReducer,
//     constructorIngredients: constructorReducer,
//     detailedIngredient: detailedIngredientReducer,
//     order: orderReducer
// }) 

export {rootReducer};