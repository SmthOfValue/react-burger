import React, {useEffect, FC} from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import AppStyles from './App.module.css';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useSelector, useDispatch } from '../../services/store';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Route, Switch, useLocation, useHistory} from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import {RegisterPage} from '../../pages/RegisterPage/RegisterPage';
import {ForgotPasswordPage} from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import { ResetPasswordPage } from '../../pages/ResetPasswordPage/ResetPasswordPage';
import {ProfilePage} from '../../pages/ProfilePage/ProfilePage';
import {FeedPage} from '../../pages/FeedPage/FeedPage';
import {OrderPage} from '../../pages/OrderPage/OrderPage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import {ProtectedRoute} from '../ProtectedRoute/ProtectedRoute';
import { getUserInfo } from '../../services/actions/profile';
import { getCookie } from '../../utils/utils';
import { getIngredients } from '../../services/actions/ingredients';
import { resetOrderModal } from '../../services/actions/orderDetails';



const App: FC = () => {
    
    const dispatch = useDispatch();

    interface ILocationState {
        background: {
            pathname: string;
            search: string;
            state: {background: Location};
            hash: string;
            key?: string | undefined;
        };
    }

    const location = useLocation<ILocationState>();
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
            <AppHeader />
            <main className={AppStyles.main}>
                <Switch location={ background || location }>
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