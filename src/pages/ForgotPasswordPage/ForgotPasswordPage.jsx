import React, {useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import forgotPasswordPageStyles from './ForgotPasswordPage.module.css';
import {Link} from 'react-router-dom';
import { setForgotPasswordFormValue, submitForgotPassword } from '../../services/actions/forgotPassword';

export const ForgotPasswordPage = () => {

    const emailRef = useRef(null);
    const formRef = useRef(null);

    const form = formRef.current;

    const { email } = useSelector(state => state.forgotPassword.form);

    const dispatch = useDispatch();

    //обработчик изменения значения полей формы
    const onFormChange = (e) => {
            dispatch(setForgotPasswordFormValue(e.target.value));
    }

    //обработчик нажатия на кнопку
    const onButtonClick = () => {
        form.requestSubmit();
    }

    //обработчик отправки формы
    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(submitForgotPassword(email));
    }

    //обработчик нажатия на иконку глаза
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    return (
        <div className={forgotPasswordPageStyles.wrapper}>
            <h1 className={`${forgotPasswordPageStyles.title} mb-6 text text_type_main-medium`}>Восстановление пароля</h1>
            <form onSubmit={onFormSubmit} ref={formRef} className={`${forgotPasswordPageStyles.form} mb-6`}>           
                    <Input                         
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={e => onFormChange(e)}
                        value={email}
                        name={'email'}
                        error={false}
                        ref={emailRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />                
            </form>
            <Button onClick={onButtonClick} className={forgotPasswordPageStyles.button} type="primary" size="medium">Восстановить</Button>
            <p className={`${forgotPasswordPageStyles.paragraph} text text_type_main-small text_color_inactive mb-4`}>
                Вспомнили пароль? <Link to="/login" className={`${forgotPasswordPageStyles.link}`}>Войти</Link>
            </p>
        </div>
    );    
}