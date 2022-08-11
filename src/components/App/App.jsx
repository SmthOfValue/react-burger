import React, {useEffect} from 'react';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.jsx';
import Modal from '../Modal/Modal';
import AppStyles from './App.module.css';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useSelector, useDispatch } from 'react-redux';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Route, Switch, useLocation, useHistory} from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage/LoginPage.jsx';
import {RegisterPage} from '../../pages/RegisterPage/RegisterPage.jsx';
import {ForgotPasswordPage} from '../../pages/ForgotPasswordPage/ForgotPasswordPage.jsx';
import { ResetPasswordPage } from '../../pages/ResetPasswordPage/ResetPasswordPage.jsx';
import {ProfilePage} from '../../pages/ProfilePage/ProfilePage.jsx';
import {FeedPage} from '../../pages/FeedPage/FeedPage.jsx';
import {OrderPage} from '../../pages/OrderPage/OrderPage.jsx';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import { getUserInfo } from '../../services/actions/profile';
import { getCookie } from '../../utils/utils';
import { getIngredients } from '../../services/actions/ingredients';
import { resetOrderModal } from '../../services/actions/orderDetails';



const App = () => {
    
    const dispatch = useDispatch();

    const location = useLocation();
    const history = useHistory();

    const orderDetailsModalIsOpen = useSelector(store => store.order.modalIsOpen);
    const {isAuth} = useSelector(store => store.user);

    const closeIngredientModal = () => {
        history.goBack();
    };

    const closeOrderModal = () => {
        dispatch(resetOrderModal());
    }

    //получение информации о пользователе и ингредиентов
    useEffect(
        () => {
            dispatch(getIngredients());
            if (getCookie('token')) {
                dispatch(getUserInfo())
            }
        }, 
        []
    );

    const background = history.action === 'PUSH' && location.state?.background;

    

    return (
        <>
            <AppHeader></AppHeader>
            <main className={AppStyles.main}>
                <Switch location={background || location}>
                    <Route path="/ingredients/:id" >
                        <IngredientDetails />
                    </Route>
                    <ProtectedRoute path="/login" anonymous={true}>
                        <LoginPage />
                    </ProtectedRoute>
                    <ProtectedRoute path="/register" anonymous={true}>
                        <RegisterPage />
                    </ProtectedRoute>
                    <ProtectedRoute path="/forgot-password" anonymous={true} >
                        <ForgotPasswordPage />
                    </ProtectedRoute>
                    <ProtectedRoute path="/reset-password" anonymous={true}>
                        <ResetPasswordPage />
                    </ProtectedRoute>
                    <Route path="/feed/:id">
                        <OrderPage />
                    </Route>
                    <Route path="/feed">
                        <FeedPage />
                    </Route>
                    <ProtectedRoute path='/profile/orders/:id'>
                        <OrderPage />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile">
                        <ProfilePage />
                    </ProtectedRoute>
                    <Route path="/" exact>
                        <DndProvider backend={HTML5Backend}>         
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </DndProvider> 
                    </Route>
                    <Route path="*" >
                        <NotFoundPage />
                    </Route>
                </Switch>
                {background && (
                    <>
                        <Route
                            path="/ingredients/:id"
                            exact
                            children={
                                <Modal 
                                    title="Детали ингредиента"
                                    onCloseClick={closeIngredientModal} >
                                    <IngredientDetails />
                                </Modal>
                            }
                        />
                        <Route
                            path="/feed/:id"
                            children={
                                <Modal 
                                    onCloseClick={closeIngredientModal} >
                                    <OrderPage />
                                </Modal>
                            }
                        />{isAuth &&
                        <ProtectedRoute
                            path='/profile/orders/:id'
                            children={
                                <Modal 
                                    onCloseClick={closeIngredientModal} >
                                    <OrderPage />
                                </Modal>
                            }
                        />}
                    </>
                    )
                }
                
                
            </main>
            {orderDetailsModalIsOpen &&
                <Modal
                    onCloseClick={closeOrderModal}
                >
                    <OrderDetails />
                </Modal>
            }
        </>
    )
}

export default App;