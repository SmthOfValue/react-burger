import React, {FC} from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css';
import type { TIngredient } from '../../utils/types';
import { useDrag } from 'react-dnd';

interface IIngredientProps {
    ingredient: TIngredient;
}

interface IDragItem {
    type: "ingredient";
    item: TIngredient;
}

const Ingredient: FC<IIngredientProps> = ({ingredient}) => {

    const [, ingredientRef] = useDrag((): IDragItem => ({
        type: "ingredient",
        item: ingredient
    }))

    return (
        <li ref={ingredientRef} className={ingredientStyles.item}>
            <img src={ingredient.image} className={ingredientStyles.image} alt={ingredient.name} />
            <span className={`mt-1 mb-1 ${ingredientStyles.price}`}>
                <p className="mr-2 text text_type_digits-default">{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </span>
            <p className={`text text_type_main-default ${ingredientStyles.name}`}>
                {ingredient.name}
            </p>
            {ingredient.__v > 0 &&
                <Counter count={ingredient.__v} size="default" />
            }
        </li>
    )
}


export default Ingredient;