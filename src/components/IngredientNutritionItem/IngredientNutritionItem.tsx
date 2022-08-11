import React, {FC} from 'react';
import IngredientNutritionItemStyles from './IngredientNutritionItem.module.css';

interface INutritionItemProps {
    title: string;
    nutritionValue: number;
}

const IngredientNutritionItem: FC<INutritionItemProps> = ({title, nutritionValue}) => {

    return (
        <li className={`mr-5 ${IngredientNutritionItemStyles.item}`}>
            <p className='mb-2 text text_type_main-small text_color_inactive'>{title}</p>
            <p className='text text_type_digits-default text_color_inactive'>{nutritionValue}</p>
        </li>
    );
}

export default IngredientNutritionItem;