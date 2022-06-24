import React, {useState, useRef} from 'react';
import { Typography, Box, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import registerPageStyles from './RegisterPage.module.css';
import {Link} from 'react-router-dom';

export const RegisterPage = () => {
    const [value, setValue] = useState('');
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const userNameRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
    return (
        <div className={registerPageStyles.wrapper}>
            <h1 className={`${registerPageStyles.title} mb-6 text text_type_main-medium`}>Регистрация</h1>
            <form className={`${registerPageStyles.form} mb-6`}>  
                    <Input                         
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        name={'userName'}
                        error={false}
                        ref={userNameRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />              
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
            <Button className={registerPageStyles.button} type="primary" size="medium">Зарегистрироваться</Button>
            <p className={`${registerPageStyles.paragraph} text text_type_main-small text_color_inactive mb-4`}>
                Уже зарегистрированы? <Link to="/login" className={`${registerPageStyles.link}`}>Войти</Link>
            </p>
        </div>
    );
    
}