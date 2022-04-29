import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientStyles from './ingredient.module.css';

const Ingredient = ({image, price, name}) => {
    return (
        <li className={ingredientStyles.item}>
            <img src={image} className={ingredientStyles.image}/>
            <span className={`mt-1 mb-1 ${ingredientStyles.price}`}>
                <p className="mr-2 text text_type_digits-default">{price}</p>
                <CurrencyIcon type="primary"/>
            </span>
            <p className={`text text_type_main-default ${ingredientStyles.name}`}>
                {name}
            </p>
            <Counter count={1} size="default" />
        </li>
    )
}

Ingredient.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
}

export default Ingredient;