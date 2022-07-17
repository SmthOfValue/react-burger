import React from 'react';
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import profilePageStyles from './ProfilePage.module.css';
import {NavLink, Switch} from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute.jsx';
import {
    logout
} from '../../services/actions/profile';
import {OrdersPage} from '../OrdersPage/OrdersPage.jsx';
import {ProfileEditPage} from '../ProfileEditPage/ProfileEditPage.jsx';


export const ProfilePage = () => {

    const onLogoutButtonClick = () => {
        dispatch(logout())
    }

    return (
        <>
            <nav className={`${profilePageStyles.nav} mr-15 mt-30`}>
                <ul className={`${profilePageStyles.list}`}>
                    <li className={profilePageStyles.item}>
                        <NavLink 
                            exact
                            to="/profile"
                            className={`${profilePageStyles.link} text text_type_main-medium text_color_inactive`}
                            activeClassName={profilePageStyles.link_active}>
                            Профиль
                        </NavLink>
                    </li>
                    <li className={profilePageStyles.item}>
                        <NavLink
                        exact
                        to="/profile/orders"
                        className={`${profilePageStyles.link} text text_type_main-medium text_color_inactive`}
                        activeClassName={profilePageStyles.link_active}>
                            История заказов
                        </NavLink>
                    </li>
                    <li className={profilePageStyles.item}>
                        <button onClick={onLogoutButtonClick} className={`${profilePageStyles.button} text text_type_main-medium text_color_inactive`}>
                            Выход
                        </button>
                    </li>
                </ul>
                <p className='text text_type_main-default mt-20 text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
            </nav>
            <Switch>
                <ProtectedRoute path='/profile/orders'>
                    <OrdersPage />
                </ProtectedRoute>
                <ProtectedRoute path='/profile'>
                    <ProfileEditPage />
                </ProtectedRoute>
            </Switch>
        </>
    );    
}