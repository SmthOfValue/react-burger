import React, {useEffect, useState} from 'react';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import Modal from '../Modal/Modal.jsx';
import AppStyles from './App.module.css';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx';
import { getIngredientsRequest, getOrderNumber } from '../../utils/burger-api.js';
import { useSelector, useDispatch } from 'react-redux';
import { RESET_INGREDIENT_MODAL } from '../../services/actions/ingredientDetails.js';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';


const App = () => {
    
    const dispatch = useDispatch();

    const detailedIngredientModalIsOpen = useSelector(store => store.detailedIngredient.modalIsOpen);


    const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); 
    const [isIngredientDetailsOpened, setIngredientDetailsOpened] = useState(false); 
    //стейт для ингредиента, который будет показан в попапе ингредиента
    const [ingredientInModal, setIngredientInModal] = useState({});
    //стейт для номера заказа
    const [orderInfo, setOrderInfo] = useState({});
    
    const [state, setState] = useState({
        allIngredients: [],
        selectedIngredients: [],
        isLoading: true
    });

    const closeAllModals = () => {
        dispatch({
            type: RESET_INGREDIENT_MODAL
        })
    };
   
    //обработчик нажатия на кнопку "Оформить заказ"
    // const openOrderDetails = () => {
    //     const idArray = state.selectedIngredients.map((ingredient) => ingredient._id);
    //     getOrderNumber(idArray)
    //         .then(res => setOrderInfo({
    //             number: res.order.number,
    //             error: false
    //         }))
    //         .catch(error => setOrderInfo({
    //             number: 0,
    //             error: true
    //         }))
    //         .finally (() => setIsOrderDetailsOpened(true));        
    // }

    //обработчик клика на ингредиент
    const openIngredientDetails = (ingredient) => {
        setIngredientInModal(ingredient);
        setIngredientDetailsOpened(true);
    }

    //запрос ингредиентов с сервера
    useEffect(() => {
        getIngredientsRequest()
            .then(res => setState({
                ...state,
                allIngredients: res.data,
                selectedIngredients: [res.data[0], res.data[5], res.data[4], res.data[6], res.data[7], res.data[2]],
                isLoading: false
            })           
    )
            .catch(error => {
                setState({...state, isLoading: false})
            })
    }, []);


    return (
        <>
            <AppHeader></AppHeader>
            <main className={AppStyles.main}>
                {!state.isLoading &&   
                <>      
                    <DndProvider backend={HTML5Backend}>         
                        <BurgerIngredients onIngredientClick={openIngredientDetails} />
                        <BurgerConstructor />
                    </DndProvider> 
                </>
                }
                {state.isLoading &&
                    <p className={`text text_type_main-large ${AppStyles.loader}`}>Загрузка...</p>
                }
            </main>
            {isOrderDetailsOpened &&
                <Modal
                    onCloseClick={closeAllModals}
                    
                >
                    <OrderDetails orderInfo={orderInfo} />
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