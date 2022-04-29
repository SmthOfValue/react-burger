import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../Ingredient/Ingredient.jsx';
import ingredientsGroupStyles from './IngredientsGroup.module.css';


const IngredientsGroup = (props) => {
        return(               
            <li className={`mt-10 ${ingredientsGroupStyles.group}`}>
                <p className={`mb-6 text text_type_main-medium ${ingredientsGroupStyles.type}`}>{props.children}</p>
                <ul className={ingredientsGroupStyles.ingredients}>
                    {props.ingredients.map((ingredient) => (
                    ingredient.type === props.type &&
                <Ingredient key={ingredient._id} image={ingredient.image} price={ingredient.price} name={ingredient.name}/>
                ))}
                </ul>
            </li>
        )
}

const ingredientPropTypes = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.oneOf(["main", "sauce", "bun"]),
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
});


IngredientsGroup.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired)
}



export default IngredientsGroup;