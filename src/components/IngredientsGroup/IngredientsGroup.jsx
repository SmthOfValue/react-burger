import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../Ingredient/Ingredient.jsx';
import { useDispatch } from 'react-redux';
import ingredientsGroupStyles from './IngredientsGroup.module.css';
import {ingredientPropType} from '../../utils/prop-types.js';
import {setIngredientModal} from '../../services/actions/ingredientDetails.js';


const IngredientsGroup = ({children, ingredients, titleId, scrollRef}) => {

    const dispatch = useDispatch();

    const onIngredientClick = (ingredient) => {
        dispatch(setIngredientModal(ingredient));
    };

    
        return(               
            <li className={`mt-10 ${ingredientsGroupStyles.group}`} id={titleId} ref={scrollRef}>
                <p className={`mb-6 text text_type_main-medium ${ingredientsGroupStyles.type}`}>{children}</p>
                <ul className={ingredientsGroupStyles.ingredients}>
                    {ingredients.map((ingredient) => (
                        <Ingredient 
                        key={ingredient._id}
                        ingredient={ingredient}
                        onIngredientClick={() => onIngredientClick(ingredient)}/>
                    ))}
                </ul>
            </li>
        )
}

IngredientsGroup.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
    children: PropTypes.string.isRequired,
    titleId: PropTypes.string.isRequired
}




export default IngredientsGroup;