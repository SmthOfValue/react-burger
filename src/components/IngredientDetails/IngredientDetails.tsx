import React, {FC} from 'react';
import IngredientDetailsStyles from './IngredientDetails.module.css';
import IngredientNutritionItem from '../IngredientNutritionItem/IngredientNutritionItem';
import { useSelector } from '../../services/store';
import {useParams, useLocation} from 'react-router-dom';
import type { TIngredient } from '../../utils/types';

interface ILocationState {
    background: Location;
}


const IngredientDetails: FC = () => {

    const { id } = useParams<{ id: string }>();
    const ingredients: ReadonlyArray<TIngredient> = useSelector(store => store.ingredients.ingredients );   
    const ingredientData = ingredients.find(ingredient => ingredient._id === id);

    const location = useLocation<ILocationState>();
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