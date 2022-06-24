import React, {useState, useRef} from 'react';
import { Typography, Box, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import forgotPasswordPageStyles from './ForgotPasswordPage.module.css';
import {Link} from 'react-router-dom';

export const ForgotPasswordPage = () => {
    const [value, setValue] = useState('');
    const emailRef = React.useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
    return (
        <div className={forgotPasswordPageStyles.wrapper}>
            <h1 className={`${forgotPasswordPageStyles.title} mb-6 text text_type_main-medium`}>Восстановление пароля</h1>
            <form className={`${forgotPasswordPageStyles.form} mb-6`}>           
                    <Input                         
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        name={'email'}
                        error={false}
                        ref={emailRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />                
            </form>
            <Button className={forgotPasswordPageStyles.button} type="primary" size="medium">Восстановить</Button>
            <p className={`${forgotPasswordPageStyles.paragraph} text text_type_main-small text_color_inactive mb-4`}>
                Вспомнили пароль? <Link to="/login" className={`${forgotPasswordPageStyles.link}`}>Войти</Link>
            </p>
        </div>
    );    
}