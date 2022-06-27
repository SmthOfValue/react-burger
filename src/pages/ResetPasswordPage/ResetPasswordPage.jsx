import React, {useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import resetPasswordPageStyles from './ResetPasswordPage.module.css';
import {Link} from 'react-router-dom';
import { setResetPasswordFormValue, submitResetPassword} from '../../services/actions/resetPassword';
import {onButtonClick} from '../../utils/utils.js';

export const ResetPasswordPage = () => {
    
    const passwordRef = React.useRef(null);
    const tokenRef = React.useRef(null);
    const formRef = React.useRef(null);

    const form = formRef.current;

    const {password, token} = useSelector(state => state.resetPassword.form);
    
    const dispatch = useDispatch();

    //обработчик изменения значения полей формы
    const onFormChange = (e) => {
        dispatch(setResetPasswordFormValue(e.target.name, e.target.value));
    }

    //обработчик отправки формы
    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(submitResetPassword(password, token));
    }

    
    
    const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

    return (
        <div className={resetPasswordPageStyles.wrapper}>
            <h1 className={`${resetPasswordPageStyles.title} mb-6 text text_type_main-medium`}>Восстановление пароля</h1>
            <form onSubmit={onFormSubmit} ref={formRef} className={`${resetPasswordPageStyles.form} mb-6`}>                            
                    <Input 
                        type={'password'}
                        placeholder={'Введите новый пароль'}
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
                    <Input                         
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onFormChange}
                        value={token}
                        name={'token'}
                        error={false}
                        ref={tokenRef}
                        errorText={'Ошибка'}
                        size={'default'}
                    />             
            </form>
            <Button onClick={() => onButtonClick(form)} className={resetPasswordPageStyles.button} type="primary" size="medium">Сохранить</Button>
            <p className={`${resetPasswordPageStyles.paragraph} text text_type_main-small text_color_inactive mb-4`}>
                Вспомнили пароль? <Link to="/login" className={`${resetPasswordPageStyles.link}`}>Войти</Link>
            </p>
        </div>
    );
    
}