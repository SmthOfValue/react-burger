import React, {useState, useRef} from 'react';
import { Typography, Box, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import loginPageStyles from './LoginPage.module.css';
import {Link} from 'react-router-dom';

export const LoginPage = () => {
    const [value, setValue] = useState('');
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
    return (
        <div className={loginPageStyles.wrapper}>
            <h1 className={`${loginPageStyles.title} mb-6 text text_type_main-medium`}>Вход</h1>
            <form className={`${loginPageStyles.form} mb-6`}>                
                    <Input                         
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={e => setValue(e.target.value)}
                        value={value}
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
            </form>
            <Button className={loginPageStyles.button} type="primary" size="medium">Войти</Button>
            <p className={`${loginPageStyles.paragraph} text text_type_main-small text_color_inactive mb-4`}>
                Вы — новый пользователь? <Link to="/register" className={`${loginPageStyles.link}`}>Зарегистрироваться</Link>
            </p>
            <p className={`${loginPageStyles.paragraph} text text_type_main-small text_color_inactive`}>
                Забыли пароль? <Link to="/forgot-password" className={`${loginPageStyles.link}`}>Восстановить</Link>
            </p>
        </div>
    );
    
}