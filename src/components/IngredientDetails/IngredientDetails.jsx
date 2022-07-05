import React from 'react';
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetailsStyles from './IngredientDetails.module.css';
import IngredientNutritionItem from '../IngredientNutritionItem/IngredientNutritionItem';
import { useSelector } from 'react-redux';
import {useParams, useLocation} from 'react-router-dom';





const IngredientDetails = () => {

    const { id } = useParams();
    const ingredients = useSelector(store => store.ingredients.ingredients );   
    const ingredientData = ingredients.find(ingredient => ingredient._id === id);

    const location = useLocation();
    const background = location.state && location.state.background;
    
    return (
        <>
        {!ingredientData &&
            <p className={`text text_type_main-large ${IngredientDetailsStyles.loader}`}>Загрузка...</p>}
        {ingredientData && (
            <div className={`pb-15 ${IngredientDetailsStyles.container}`}>
                {!background && <h2 className='text text_type_main-large'>Детали ингредиента</h2>}
                <img src={ingredientData.image} alt={ingredientData.name} className={IngredientDetailsStyles.image} />
                <p className=' mt-4 text text_type_main-default'>{ingredientData.name}</p>
                <ul className={`mt-8 ${IngredientDetailsStyles.nutrition}`}>
                    <IngredientNutritionItem title="Калории, ккал" nutritionValue={ingredientData.calories} />
                    <IngredientNutritionItem title="Белки, г" nutritionValue={ingredientData.proteins} />
                    <IngredientNutritionItem title="Жиры, г" nutritionValue={ingredientData.fat} />
                    <IngredientNutritionItem title="Углеводы, г" nutritionValue={ingredientData.carbohydrates} />
                </ul>
            </div>)
            }
        </>
    )
};



export default IngredientDetails;