import React, { useContext, useReducer, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import {ingredientPropType} from '../../utils/prop-types.js';
import { IngredientsContext } from '../../services/IngredientsContext.js';
import { getOrderNumber } from '../../utils/burger-api.js';

const BurgerConstructor = ({ onCheckoutClick }) => {

    //начальный стейт содержимого конструктора для использования во 2-й части проектной работы
    const selectedIngredientsInitialState = {
        bun: null,
        middleIngredients: []
    }
    //плейсхолдер ингредиентов для проверки подсчета стоимости заказа
    const constructorContext = useContext(IngredientsContext);
    const bun = constructorContext.selectedIngredients.find((ingredient) => ingredient.type === "bun");
    const middleIngredients = constructorContext.selectedIngredients.filter((ingredient) => ingredient.type !== "bun");
    const selectedIngredients = useMemo(() => {
        return {
            bun: bun,
            middleIngredients: middleIngredients
        }
    }, [constructorContext] )
     
    //изначальное значение стоимости заказа
    const initialTotalPrice = { totalPrice: 0 };

    //функция reducer для подсчета стоимости заказа: считает стоимость ингредиентов между булок и прибавляет их к удвоенной цене за булку, т.к. булок две
    const reducer = (state, action) => {
        switch (action.type) {
            case "update":
                const totalPrice = selectedIngredients.middleIngredients.reduce(
                    function (sum, currentIngredient) {
                        return sum + currentIngredient.price
                    }, initialTotalPrice.totalPrice);
                    
              return { totalPrice: totalPrice + selectedIngredients.bun.price * 2}; 
            default:
                throw new Error(`Wrong type of action: ${action.type}`);
            };
        }  
    
    //стоимость заказа
    const [totalPrice, dispatch] = useReducer(reducer, initialTotalPrice);
    //подсчет стоимости заказа при монтировании компонента
    useEffect(() => dispatch({type: "update"}), [selectedIngredients])

    //создаю список начинок и соусов для рендера
    const middleIngredientsList = selectedIngredients.middleIngredients.map((selectedIngredient) => (
        <li key={selectedIngredient._id} className={BurgerConstructorStyles.element}>
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
                    text={`${selectedIngredients.bun.name} (верх)`}
                    price={selectedIngredients.bun.price}
                    thumbnail={selectedIngredients.bun.image}
                />
            </div>
            <ul className={` ${BurgerConstructorStyles.list}`}> 
                {middleIngredientsList}       
            </ul>
            <div className={`ml-4 ${BurgerConstructorStyles.ingredient}`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}       
                    text={`${selectedIngredients.bun.name} (низ)`}
                    price={selectedIngredients.bun.price}
                    thumbnail={selectedIngredients.bun.image}
                />
            </div>
            <div className={`mt-6 mr-4 ${BurgerConstructorStyles.checkout}`}>
                <p className={`text text_type_digits-medium mr-10 ${BurgerConstructorStyles.total}`}>
                    <span className="mr-2">{totalPrice.totalPrice}</span>
                    <CurrencyIcon type="primary"/>
                </p>
                <Button onClick={onCheckoutClick}>Оформить заказ</Button>
            </div>
        </section>
    )
}



BurgerConstructor.propTypes = {
    onCheckoutClick: PropTypes.func.isRequired
}

export default BurgerConstructor;