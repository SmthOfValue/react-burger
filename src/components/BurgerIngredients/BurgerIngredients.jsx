import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import IngredientsGroup from '../IngredientsGroup/IngredientsGroup.jsx';
import {ingredientPropType} from '../../utils/prop-types.js';


const BurgerIngredients = ({ingredients, onIngredientClick}) => {
    const [current, setCurrent] = React.useState('булки');
    //функция фильтрации массива ингредиентов по типу ингредиента
    const filterByType = (ingredientsArray, typeName) => {
        return ingredientsArray.filter((ingredient) => ingredient.type === typeName);
    }
    
        return(
            <section className={`mr-10 ${burgerIngredientsStyles.section}`}>
                <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
                <div style={{ display: 'flex' }}>
                    <Tab value="булки" active={current === 'булки'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="соусы" active={current === 'соусы'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="начинки" active={current === 'начинки'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
                <ul className={burgerIngredientsStyles.list}>
                    <IngredientsGroup ingredients={filterByType(ingredients, "bun")} type="bun" onIngredientClick={onIngredientClick}>Булки</IngredientsGroup>
                    <IngredientsGroup ingredients={filterByType(ingredients, "sauce")} type="sauce" onIngredientClick={onIngredientClick}>Соусы</IngredientsGroup>
                    <IngredientsGroup ingredients={filterByType(ingredients, "main")} type="main" onIngredientClick={onIngredientClick}>Начинки</IngredientsGroup>
                </ul>             
            </section>
        )
}


BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
    onIngredientClick: PropTypes.func.isRequired
}



export default BurgerIngredients;