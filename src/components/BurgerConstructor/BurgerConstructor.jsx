import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, ConstructorElement, Button, CurrencyIcon, LockIcon, DragIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.css';

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
const ingredientPropTypes = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.oneOf(["main", "sauce", "bun"]),
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
});


BurgerConstructor.propTypes = {
    selectedIngredients: PropTypes.arrayOf(ingredientPropTypes.isRequired)
}

export default BurgerConstructor;