import React from 'react';

import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../Ingredient/Ingredient.jsx';
import { useDispatch } from 'react-redux';
import ingredientsGroupStyles from './IngredientsGroup.module.css';
import { Link, useLocation } from 'react-router-dom';


const IngredientsGroup = ({children, ingredients, titleId, scrollRef}) => {

    const dispatch = useDispatch();
    const location = useLocation();

       
        return(               
            <li className={`mt-10 ${ingredientsGroupStyles.group}`} id={titleId} ref={scrollRef}>
                <p className={`mb-6 text text_type_main-medium ${ingredientsGroupStyles.type}`}>{children}</p>
                <ul className={ingredientsGroupStyles.ingredients}>
                    {ingredients.map((ingredient) => (
                        <Link
                            key={ingredient._id}
                            to={{
                                pathname: `/ingredients/${ingredient._id}`,
                                state: {background: location}
                            }}
                            className={ingredientsGroupStyles.link}
                        >
                            <Ingredient 
                                ingredient={ingredient}
                                />
                        </Link>
                    ))}
                </ul>
            </li>
        )
}


export default IngredientsGroup;