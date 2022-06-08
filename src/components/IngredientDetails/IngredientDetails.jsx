import React from 'react';
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetailsStyles from './IngredientDetails.module.css';
import IngredientNutritionItem from '../IngredientNutritionItem/IngredientNutritionItem';
import { useSelector } from 'react-redux';



const IngredientDetails = () => {
    
    const {image, name, calories, fat, carbohydrates, proteins } = useSelector(store => store.detailedIngredient.ingredientInModal);
    
    return (
    <div className={`pb-15 ${IngredientDetailsStyles.container}`}>
        <img src={image} alt={name} className={IngredientDetailsStyles.image} />
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



export default IngredientDetails;