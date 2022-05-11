import React from 'react';
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetailsStyles from './IngredientDetails.module.css';
import IngredientNutritionItem from '../IngredientNutritionItem/IngredientNutritionItem';
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-types.js';


const IngredientDetails = ({ingredient}) => {
    const {image, name, calories, fat, carbohydrates, proteins } = ingredient;
    
    return (
    <div className={`pb-15 ${IngredientDetailsStyles.container}`}>
        <img src={image} className={IngredientDetailsStyles.image} />
        <p className=' mt-4 text text_type_main-default'>{name}</p>
        <ul className={`mt-8 ${IngredientDetailsStyles.nutrition}`}>
            <IngredientNutritionItem title="Калории, ккал" nutritionValue={calories} />
            <IngredientNutritionItem title="Белки, г" nutritionValue={proteins} />
            <IngredientNutritionItem title="Жиры, г" nutritionValue={fat} />
            <IngredientNutritionItem title="Углеводы, г" nutritionValue={carbohydrates} />
        </ul>
    </div>
    )
};

IngredientDetails.propTypes = {
    ingredient: ingredientPropType.isRequired
}

export default IngredientDetails;