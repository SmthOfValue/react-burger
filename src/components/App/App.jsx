import React from 'react';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import ingredients from '../../utils/data.js';

const App = (props) => {
    return (
        <>
            <AppHeader></AppHeader>
            <main>
                <BurgerIngredients ingredients={ingredients}></BurgerIngredients>
            </main>
        </>
    )
}

export default App;