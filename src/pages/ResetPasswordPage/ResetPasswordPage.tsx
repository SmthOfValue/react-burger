import React, {useRef, FC} from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import resetPasswordPageStyles from './ResetPasswordPage.module.css';
import {Link, useLocation, Redirect} from 'react-router-dom';
import { setResetPasswordFormValue, submitResetPassword} from '../../services/actions/resetPassword';
import {onButtonClick} from '../../utils/utils';

export const ResetPasswordPage: FC = () => {
    
    const formRef = useRef<HTMLFormElement>(null);

    const form = formRef.current;

    const {password, token} = useSelector(state => state.resetPassword.form);
    const {passwordResetSuccess} = useSelector(state => state.resetPassword)
    
    const dispatch = useDispatch();
    const location = useLocation<ILocationState>();

    interface ILocationState {
        isEmailSent: boolean;
    }

    //индикатор отправленного письма с кодом сброса пароля для защиты доступа к маршруту
    const isEmailSent = location.state?.isEmailSent;

    //обработчик изменения значения полей формы
    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setResetPasswordFormValue(e.target.name, e.target.value));
    }

    //обработчик отправки формы
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(submitResetPassword(password, token));
    }

    if (!isEmailSent) {
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

    if (passwordResetSuccess) {
        return (
            <Redirect
                to={
                    {
                        pathname: '/login'
                    }
                }
            />
        );
    }

    return (
        <div className={resetPasswordPageStyles.wrapper}>
            <h1 className={`${resetPasswordPageStyles.title} mb-6 text text_type_main-medium`}>Восстановление пароля</h1>
            <form onSubmit={onFormSubmit} ref={formRef} className={`${resetPasswordPageStyles.form} mb-6`}>                            
                    <PasswordInput 
                        onChange={onFormChange}
                        value={password}
                        name={'password'}
                        size={'default'}
                    />     
                    <Input                         
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onFormChange}
                        value={token}
                        name={'token'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />             
            </form>
            <Button disabled={form ? false : true} onClick={() => onButtonClick(form)} type="primary" size="medium">Сохранить</Button>
            <p className={`${resetPasswordPageStyles.paragraph} text text_type_main-small text_color_inactive mb-4`}>
                Вспомнили пароль? <Link to="/login" className={`${resetPasswordPageStyles.link}`}>Войти</Link>
            </p>
        </div>
    );
    
}