import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, ConstructorElement, Button, CurrencyIcon, LockIcon, DragIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import {ingredientPropType} from '../../utils/prop-types.js';

const BurgerConstructor = ({selectedIngredients}) => {
    //отделяю булки от всего остального в списке ингредиентов
    const bun = selectedIngredients.find((ingredient) => ingredient.type === "bun");
    const middleIngredients = selectedIngredients.filter((ingredient) => ingredient.type !== "bun");
    //создаю список начинок и соусов для рендера
    const middleIngredientsList = middleIngredients.map((selectedIngredient, index) => (
        <li key={index} className={BurgerConstructorStyles.element}>
            <span className="mr-2">
                <DragIcon type="primary"></DragIcon>
            </span>
            <span className={BurgerConstructorStyles.ingredient}>
                <ConstructorElement                
                    isLocked={false}            
                    text={selectedIngredient.name}
                    price={selectedIngredient.price}
                    thumbnail={selectedIngredient.image}
                />
            </span>
        </li>
    ))    
    return (
        <section className={`mt-15 ml-4 ${BurgerConstructorStyles.section}`}>
                <div className={`ml-4 ${BurgerConstructorStyles.ingredient}`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}       
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            <ul className={` ${BurgerConstructorStyles.list}`}> 
                {middleIngredientsList}       
            </ul>
            <div className={`ml-4 ${BurgerConstructorStyles.ingredient}`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}       
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            <div className={`mt-6 mr-4 ${BurgerConstructorStyles.checkout}`}>
                <p className={`text text_type_digits-medium mr-10 ${BurgerConstructorStyles.total}`}>
                    <span className="mr-2">6196</span>
                    <CurrencyIcon type="primary"/>
                </p>
                <Button>Оформить заказ</Button>
            </div>
        </section>
    )
}



BurgerConstructor.propTypes = {
    selectedIngredients: PropTypes.arrayOf(ingredientPropType).isRequired
}

export default BurgerConstructor;