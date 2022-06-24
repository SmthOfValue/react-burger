import React, {useState, useRef} from 'react';
import { Typography, Box, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import resetPasswordPageStyles from './ResetPasswordPage.module.css';
import {Link} from 'react-router-dom';

export const ResetPasswordPage = () => {
    const [value, setValue] = useState('');
    const passwordRef = React.useRef(null);
    const emailCodeRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
    return (
        <div className={resetPasswordPageStyles.wrapper}>
            <h1 className={`${resetPasswordPageStyles.title} mb-6 text text_type_main-medium`}>Восстановление пароля</h1>
            <form className={`${resetPasswordPageStyles.form} mb-6`}>                            
                    <Input 
                        type={'password'}
                        placeholder={'Введите новый пароль'}
                        onChange={e => setValue(e.target.value)}
                        value={value}
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
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        name={'emailCode'}
                        error={false}
                        ref={emailCodeRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />             
            </form>
            <Button className={resetPasswordPageStyles.button} type="primary" size="medium">Сохранить</Button>
            <p className={`${resetPasswordPageStyles.paragraph} text text_type_main-small text_color_inactive mb-4`}>
                Вспомнили пароль? <Link to="/login" className={`${resetPasswordPageStyles.link}`}>Войти</Link>
            </p>
        </div>
    );
    
}