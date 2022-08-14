import React, { useRef, FC} from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import registerPageStyles from './RegisterPage.module.css';
import {Link, Redirect} from 'react-router-dom';
import {setRegistrationFormValue, submitRegistration} from '../../services/actions/registration';
import {onButtonClick} from '../../utils/utils';

export const RegisterPage: FC = () => {
    
    const formRef = useRef<HTMLFormElement>(null);

    const form = formRef.current;

    const {email, name, password} = useSelector(state => state.registration.form);
    const {isAuth} = useSelector (state => state.user);

    const dispatch = useDispatch();

    //обработчик отправки формы
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(submitRegistration(email, password, name));
    }

    //обработчик изменения значения полей формы
    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setRegistrationFormValue(e.target.name, e.target.value));
    }


    //редирект на главную после успешного логина
    if (isAuth) {
        return (
            <Redirect
                to={
                    {
                        pathname: '/'
                    }
                }
            />
        );
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
                        errorText={'Ошибка'}
                        size={'default'}
                    />                
                    <PasswordInput 
                        onChange={onFormChange}
                        value={password}
                        name={'password'}
                        size={'default'}
                    />                
            </form>
            <Button disabled={form ? false : true} onClick={() => onButtonClick(form)} type="primary" size="medium">Зарегистрироваться</Button>
            <p className={`${registerPageStyles.paragraph} text text_type_main-small text_color_inactive mb-4`}>
                Уже зарегистрированы? <Link to="/login" className={`${registerPageStyles.link}`}>Войти</Link>
            </p>
        </div>
    );
    
}