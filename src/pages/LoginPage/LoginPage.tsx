import React, {FC, useRef} from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import loginPageStyles from './LoginPage.module.css';
import {Link, Redirect, useLocation} from 'react-router-dom';
import {setLoginFormValue, submitLogin} from '../../services/actions/login';
import {onButtonClick} from '../../utils/utils';

export const LoginPage: FC = () => {

    const {email, password} = useSelector(state => state.login.form);
    const {isAuth} = useSelector (state => state.user);

    interface IStateType {
        from: { pathname: string }
     }

    const dispatch = useDispatch();
    const { state } = useLocation<IStateType>();

    //обработчик отправки формы
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(submitLogin(email, password));
    }

    //обработчик изменения значения полей формы
    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const formRef = useRef<HTMLFormElement>(null);

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
                        onChange={onFormChange}
                        value={password}
                        name={'password'}
                        size={'default'}
                    />                
            </form>
            
            <Button disabled={form ? false : true} onClick={() => onButtonClick(form)} type="primary" size="medium">Войти</Button>
            <p className={`${loginPageStyles.paragraph} text text_type_main-small text_color_inactive mb-4`}>
                Вы — новый пользователь? <Link to="/register" className={`${loginPageStyles.link}`}>Зарегистрироваться</Link>
            </p>
            <p className={`${loginPageStyles.paragraph} text text_type_main-small text_color_inactive`}>
                Забыли пароль? <Link to="/forgot-password" className={`${loginPageStyles.link}`}>Восстановить</Link>
            </p>
        </div>
    );
    
}