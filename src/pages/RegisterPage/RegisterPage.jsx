import React, {useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import registerPageStyles from './RegisterPage.module.css';
import {Link} from 'react-router-dom';
import {setRegistrationFormValue, submitRegisration} from '../../services/actions/registration';
import {onButtonClick} from '../../utils/utils.js';

export const RegisterPage = () => {
    
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const userNameRef = React.useRef(null);

    const formRef = React.useRef(null);

    const form = formRef.current;

    const {email, name, password} = useSelector(state => state.registration.form);

    const dispatch = useDispatch();

     //обработчик отправки формы
     const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(submitRegisration(email, password, name));
    }

    //обработчик изменения значения полей формы
    const onFormChange = (e) => {
        dispatch(setRegistrationFormValue(e.target.name, e.target.value));
    }


    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    return (
        <div className={registerPageStyles.wrapper}>
            <h1 className={`${registerPageStyles.title} mb-6 text text_type_main-medium`}>Регистрация</h1>
            <form onSubmit={onFormSubmit} ref={formRef} className={`${registerPageStyles.form} mb-6`}>  
                    <Input                         
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onFormChange}
                        value={name}
                        name={'name'}
                        error={false}
                        ref={userNameRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />              
                    <Input                         
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={onFormChange}
                        value={email}
                        name={'email'}
                        error={false}
                        ref={emailRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />                
                    <Input 
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={onFormChange}
                        value={password}
                        name={'password'}
                        error={false}
                        icon={"ShowIcon"}
                        ref={passwordRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />                
            </form>
            <Button onClick={() => onButtonClick(form)} className={registerPageStyles.button} type="primary" size="medium">Зарегистрироваться</Button>
            <p className={`${registerPageStyles.paragraph} text text_type_main-small text_color_inactive mb-4`}>
                Уже зарегистрированы? <Link to="/login" className={`${registerPageStyles.link}`}>Войти</Link>
            </p>
        </div>
    );
    
}