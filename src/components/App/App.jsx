import React from 'react';

import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import {ingredients, selectedIngredients} from '../../utils/data.js';
import AppStyles from './App.module.css';

const App = (props) => {
    return (
        <>
            <AppHeader></AppHeader>
            <main className={AppStyles.main}>
                <BurgerIngredients ingredients={ingredients}></BurgerIngredients>
                <BurgerConstructor selectedIngredients={selectedIngredients}></BurgerConstructor>
            </main>
        </>
    )
}

export default App;