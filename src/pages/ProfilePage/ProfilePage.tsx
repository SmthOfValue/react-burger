import React, {useEffect, FC} from 'react';
import { useDispatch } from '../../services/store';
import profilePageStyles from './ProfilePage.module.css';
import {NavLink, Switch} from 'react-router-dom';
import {ProtectedRoute} from '../../components/ProtectedRoute/ProtectedRoute';
import {
    logout
} from '../../services/actions/profile';
import {OrdersPage} from '../OrdersPage/OrdersPage';
import {ProfileEditPage} from '../ProfileEditPage/ProfileEditPage';
import { getUserInfo } from '../../services/actions/profile';


export const ProfilePage: FC = () => {

    const dispatch = useDispatch();

    const onLogoutButtonClick = () => {
        dispatch(logout())
    }

    //получение информации о пользователе
    useEffect(
        () => {
            dispatch(getUserInfo())
        }, 
        []
    ); 
    

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