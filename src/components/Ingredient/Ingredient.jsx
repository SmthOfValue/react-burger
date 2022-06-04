import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css';
import {ingredientPropType} from '../../utils/prop-types.js';
import { useDrag } from 'react-dnd'

const Ingredient = ({ingredient, onIngredientClick}) => {

    const {id} = ingredient;
    const [{}, ingredientRef] = useDrag(() => ({
        type: "ingredient",
        item: { id }
    }))

    return (
        <li ref={ingredientRef} className={ingredientStyles.item} onClick={() => onIngredientClick(ingredient)}>
            <img src={ingredient.image} className={ingredientStyles.image} alt={ingredient.name} />
            <span className={`mt-1 mb-1 ${ingredientStyles.price}`}>
                <p className="mr-2 text text_type_digits-default">{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </span>
            <p className={`text text_type_main-default ${ingredientStyles.name}`}>
                {ingredient.name}
            </p>
            <Counter count={1} size="default" />
        </li>
    )
}

Ingredient.propTypes = {
    ingredient: ingredientPropType.isRequired,
    onIngredientClick: PropTypes.func.isRequired
}

export default Ingredient;