import { generateID } from "../../utils/utils";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';


export const addIngredient = (ingredient) => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            ...ingredient,
            constructorId: generateID()
        }
    }
}

export const removeIngredient = (constructorId) => {
    return {
        type: REMOVE_INGREDIENT,
        constructorId
    }
}

export const moveIngredient = (dragIndex, hoverIndex) => {
    return {
        type: MOVE_INGREDIENT,
        dragIndex,
        hoverIndex
    }
}