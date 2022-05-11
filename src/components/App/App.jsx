import {React, useEffect, useState} from 'react';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import Modal from '../Modal/Modal.jsx';
import AppStyles from './App.module.css';
import { ingredientsUrl } from '../../utils/constants.js';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';
import IngredientDetails from '../IngredientDetails/IngredientDetails.jsx';



const App = () => {
    const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false); 
    const [isIngredientDetailsOpened, setIngredientDetailsOpened] = useState(false); 
    //стейт для ингредиента, который будет показан в попапе ингредиента
    const [ingredientInModal, setIngredientInModal] = useState({});
    
    const [state, setState] = useState({
        allIngredients: [],
        selectedIngredients: [],
        isLoaded: false
    });

    const getIngredients = () => {
        fetch(ingredientsUrl)
        .then (res => res.json())
        .then (res => setState({
                ...state,
                allIngredients: res.data,
                selectedIngredients: [res.data[0], res.data[5], res.data[4], res.data[6], res.data[7], res.data[7], res.data[4], res.data[2]],
                isLoaded: true
            })           
        )
        .catch(error => {
            setState({...state, isLoaded: true})
            console.log(error);
        })
    }

    const closeAllModals = () => {
        setIsOrderDetailsOpened(false);
        setIngredientDetailsOpened(false);
        
    };

    //обработчик нажатия на кнопку "Оформить заказ", который передается в конструктор
    const openOrderDetails = () => {
        setIsOrderDetailsOpened(true);
    }

    //обработчик клика на ингредиент
    const openIngredientDetails = (ingredient) => {
        setIngredientInModal(ingredient);
        setIngredientDetailsOpened(true);
    }

    //запрос ингредиентов с сервера
    useEffect(() => {
        getIngredients()
    }, []);


    return (
        <>
            <AppHeader></AppHeader>
            <main className={AppStyles.main}>
                {state.isLoaded &&
                    <>
                        <BurgerIngredients ingredients={state.allIngredients} onIngredientClick={openIngredientDetails} />
                        <BurgerConstructor selectedIngredients={state.selectedIngredients} onCheckoutClick={openOrderDetails}/>
                    </>
                }
            </main>
            {isOrderDetailsOpened &&
                <Modal
                    onCloseClick={closeAllModals}
                >
                    <OrderDetails />
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