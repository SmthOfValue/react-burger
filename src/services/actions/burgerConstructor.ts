import { generateID } from "../../utils/utils";
import type { TIngredient } from "../../utils/types";

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';

interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: TIngredient & {constructorId: string};
};

export const addIngredient = (ingredient: TIngredient): IAddIngredientAction => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            ...ingredient,
            constructorId: generateID()
        }
    }
}

interface IRemoveIngredientAction {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly constructorId: string;
};

export const removeIngredient = (constructorId: string): IRemoveIngredientAction => {
    return {
        type: REMOVE_INGREDIENT,
        constructorId
    }
}

interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT;
    readonly dragIndex: number;
    readonly hoverIndex: number;
};

export const moveIngredient = (dragIndex: number, hoverIndex: number): IMoveIngredientAction => {
    return {
        type: MOVE_INGREDIENT,
        dragIndex,
        hoverIndex
    }
}

export type TBurgerConstructorActions = 
    | IAddIngredientAction
  | IRemoveIngredientAction
  | IMoveIngredientAction;