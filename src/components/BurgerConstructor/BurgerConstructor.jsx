import React, { useState } from 'react';
import { Typography, Box, ConstructorElement, Button, CurrencyIcon, LockIcon, DragIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.css';

const BurgerConstructor = ({selectedIngredients}) => {
    const bun = selectedIngredients.find((ingredient) => ingredient.type === "bun");
    const middleIngredients = selectedIngredients.filter((ingredient) => ingredient.type !== "bun");
    const middleIngredientsList = middleIngredients.map((selectedIngredient, index) => (
        <li key={index} className={BurgerConstructorStyles.element}>
            {!(index === 0 || index === selectedIngredients.length-1) &&
            <span className="mr-2">
                <DragIcon type="primary"></DragIcon>
            </span>}
            <span className={`${(index === 0 || index === selectedIngredients.length-1) && "ml-8"} ${BurgerConstructorStyles.ingredient}`}>
                <ConstructorElement
                type={index === 0 ? "top" : index === selectedIngredients.length-1 && "bottom"}
                isLocked={index === 0 ? true : index === selectedIngredients.length-1 && true}            
                text={selectedIngredient.name}
                price={selectedIngredient.price}
                thumbnail={selectedIngredient.image}
                // className={BurgerConstructorStyles.element}
                />
            </span>
        </li>
    ))    
    return (
        <section className={`mt-15 ${BurgerConstructorStyles.section}`}>
             <ConstructorElement
                type="top"
                isLocked={true}       
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
                // className={BurgerConstructorStyles.element}
                />
            <ul className={`ml-4 ${BurgerConstructorStyles.list}`}> 
                {middleIngredientsList}       
            </ul>
            <ConstructorElement
                type="bottom"
                isLocked={true}       
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
                // className={BurgerConstructorStyles.element}
                />
            <div>
                <span className={``}>
                    <p className=""></p>
                    <CurrencyIcon type="primary"/>
                </span>
                <Button>Оформить заказ</Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;