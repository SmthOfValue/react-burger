import React from 'react';
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import IngredientNutritionItemStyles from './IngredientNutritionItem.module.css';

const IngredientNutritionItem = ({title, nutritionValue}) => {

    return (
        <li className={`mr-5 ${IngredientNutritionItemStyles.item}`}>
            <p className='mb-2 text text_type_main-small text_color_inactive'>{title}</p>
            <p className='text text_type_digits-default text_color_inactive'>{nutritionValue}</p>
        </li>
    );
}

IngredientNutritionItem.propTypes = {
    title: PropTypes.string.isRequired,
    nutritionValue: PropTypes.number.isRequired
}

export default IngredientNutritionItem;