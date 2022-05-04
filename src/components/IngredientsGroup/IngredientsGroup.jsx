import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../Ingredient/Ingredient.jsx';
import ingredientsGroupStyles from './IngredientsGroup.module.css';
import {ingredientPropType} from '../../utils/prop-types.js';


const IngredientsGroup = (props) => {
        return(               
            <li className={`mt-10 ${ingredientsGroupStyles.group}`}>
                <p className={`mb-6 text text_type_main-medium ${ingredientsGroupStyles.type}`}>{props.children}</p>
                <ul className={ingredientsGroupStyles.ingredients}>
                    {props.ingredients.map((ingredient) => (
                        <Ingredient key={ingredient._id} image={ingredient.image} price={ingredient.price} name={ingredient.name}/>
                    ))}
                </ul>
            </li>
        )
}

IngredientsGroup.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
    children: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["main", "sauce", "bun"]).isRequired
}




export default IngredientsGroup;