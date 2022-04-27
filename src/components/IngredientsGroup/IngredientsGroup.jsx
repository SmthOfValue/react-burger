import React, { useState } from 'react';
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

export default IngredientsGroup;