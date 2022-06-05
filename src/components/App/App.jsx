import React from 'react';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import Modal from '../Modal/Modal.jsx';
import AppStyles from './App.module.css';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { RESET_INGREDIENT_MODAL } from '../../services/actions/ingredientDetails.js';
import {RESET_ORDER_MODAL} from '../../services/actions/orderDetails.js';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';


const App = () => {
    
    const dispatch = useDispatch();

    const detailedIngredientModalIsOpen = useSelector(store => store.detailedIngredient.modalIsOpen);
    const orderDetailsModalIsOpen = useSelector(store => store.order.modalIsOpen);

    const closeAllModals = () => {
        dispatch({
            type: RESET_INGREDIENT_MODAL
        });
        dispatch({
            type: RESET_ORDER_MODAL
        });
    };

    return (
        <>
            <AppHeader></AppHeader>
            <main className={AppStyles.main}>
                <>      
                    <DndProvider backend={HTML5Backend}>         
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider> 
                </>
            </main>
            {orderDetailsModalIsOpen &&
                <Modal
                    onCloseClick={closeAllModals}
                >
                    <OrderDetails />
                </Modal>
            }
            {detailedIngredientModalIsOpen &&
                <Modal
                    title="Детали ингредиента"
                    onCloseClick={closeAllModals}
                >
                    <IngredientDetails />
                </Modal>
            }
        </>
    )
}

export default App;