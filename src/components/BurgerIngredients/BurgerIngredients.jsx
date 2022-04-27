import React, { useState } from 'react';
import { Typography, Box, Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../Ingredient/Ingredient.jsx';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import IngredientsGroup from '../IngredientsGroup/IngredientsGroup.jsx';


const BurgerIngredients = ({ingredients}) => {
    const [current, setCurrent] = React.useState('булки');
        return(
            <section>
                <h1 className="text text_type_main-large">Соберите бургер</h1>
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
                <ul className={burgerIngredientsStyles.types}>
                    <IngredientsGroup ingredients={ingredients} type="bun">Булки</IngredientsGroup>
                    <IngredientsGroup ingredients={ingredients} type="sauce">Соусы</IngredientsGroup>
                    <IngredientsGroup ingredients={ingredients} type="main">Начинки</IngredientsGroup>
                </ul>
             
            </section>
        )
}

export default BurgerIngredients;