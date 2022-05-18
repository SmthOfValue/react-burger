import React, {useEffect, useState} from 'react';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import Modal from '../Modal/Modal.jsx';
import AppStyles from './App.module.css';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx';
import { getIngredients, getOrderNumber } from '../../utils/burger-api.js';
import { IngredientsContext } from '../../services/IngredientsContext.js';


const App = () => {
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
        setIsOrderDetailsOpened(false);
        setIngredientDetailsOpened(false);
    };
   
    //обработчик нажатия на кнопку "Оформить заказ"
    const openOrderDetails = () => {
        const idArray = state.selectedIngredients.map((ingredient) => ingredient._id);
        getOrderNumber(idArray)
            .then(res => setOrderInfo({
                number: res.order.number,
                error: false
            }))
            .catch(error => setOrderInfo({
                number: 0,
                error: true
            }))
            .finally (() => setIsOrderDetailsOpened(true));        
    }

    //обработчик клика на ингредиент
    const openIngredientDetails = (ingredient) => {
        setIngredientInModal(ingredient);
        setIngredientDetailsOpened(true);
    }

    //запрос ингредиентов с сервера
    useEffect(() => {
        getIngredients()
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
                    <IngredientsContext.Provider value={state}>
                        <BurgerIngredients onIngredientClick={openIngredientDetails} />
                        <BurgerConstructor onCheckoutClick={openOrderDetails}/>
                    </IngredientsContext.Provider>  
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
            {isIngredientDetailsOpened &&
                <Modal
                    title="Детали ингредиента"
                    onCloseClick={closeAllModals}
                >
                    <IngredientDetails ingredient={ingredientInModal} />
                </Modal>
            }
        </>
    )
}

export default App;