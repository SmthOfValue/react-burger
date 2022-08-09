import React, {useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import loginPageStyles from './LoginPage.module.css';
import {Link, Redirect} from 'react-router-dom';
import {setLoginFormValue, submitLogin} from '../../services/actions/login';
import {onButtonClick} from '../../utils/utils';

export const LoginPage = () => {

    const {email, password} = useSelector(state => state.login.form);
    const {isAuth} = useSelector (state => state.user);

    const dispatch = useDispatch();

    //обработчик отправки формы
    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(submitLogin(email, password));
    }

    //обработчик изменения значения полей формы
    const onFormChange = (e) => {
        dispatch(setLoginFormValue(e.target.name, e.target.value));
    }

    //редирект на главную после успешного логина
    if (isAuth) {
        return (
            <Redirect
                to={ state?.from || '/' }
            />
        );
    }

    const formRef = useRef(null);

    const form = formRef.current;


    return (
        <div className={loginPageStyles.wrapper}>
            <h1 className={`${loginPageStyles.title} mb-6 text text_type_main-medium`}>Вход</h1>
            <form onSubmit={onFormSubmit} ref={formRef} className={`${loginPageStyles.form} mb-6`}>                
                    <Input                         
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={onFormChange}
                        value={email}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />                
                    <PasswordInput 
                        type={'password'}
                        onChange={onFormChange}
                        value={password}
                        name={'password'}
                        error={false}
                        size={'default'}
                    />                
            </form>
            
            <Button disabled={form ? false : true} onClick={() => onButtonClick(form)} className={loginPageStyles.button} type="primary" size="medium">Войти</Button>
            <p className={`${loginPageStyles.paragraph} text text_type_main-small text_color_inactive mb-4`}>
                Вы — новый пользователь? <Link to="/register" className={`${loginPageStyles.link}`}>Зарегистрироваться</Link>
            </p>
            <p className={`${loginPageStyles.paragraph} text text_type_main-small text_color_inactive`}>
                Забыли пароль? <Link to="/forgot-password" className={`${loginPageStyles.link}`}>Восстановить</Link>
            </p>
        </div>
    );
    
}