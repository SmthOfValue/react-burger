import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../Ingredient/Ingredient.jsx';
import ingredientsGroupStyles from './IngredientsGroup.module.css';
import {ingredientPropType} from '../../utils/prop-types.js';


const IngredientsGroup = ({children, ingredients, onIngredientClick}) => {
        return(               
            <li className={`mt-10 ${ingredientsGroupStyles.group}`}>
                <p className={`mb-6 text text_type_main-medium ${ingredientsGroupStyles.type}`}>{children}</p>
                <ul className={ingredientsGroupStyles.ingredients}>
                    {ingredients.map((ingredient) => (
                        <Ingredient 
                        key={ingredient._id}
                        ingredient={ingredient}
                        onIngredientClick={onIngredientClick}/>
                    ))}
                </ul>
            </li>
        )
}

IngredientsGroup.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
    children: PropTypes.string.isRequired,
    onIngredientClick: PropTypes.func.isRequired
}




export default IngredientsGroup;