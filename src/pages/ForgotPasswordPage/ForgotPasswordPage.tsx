import React, {useRef, FC, FormEvent} from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import forgotPasswordPageStyles from './ForgotPasswordPage.module.css';
import {Link, useHistory} from 'react-router-dom';
import { setForgotPasswordFormValue, submitForgotPassword } from '../../services/actions/forgotPassword';
import {onButtonClick} from '../../utils/utils';

export const ForgotPasswordPage: FC = () => {


    const formRef = useRef<HTMLFormElement>(null);

    const form = formRef.current;

    const { email } = useSelector(state => state.forgotPassword.form);

    const dispatch = useDispatch();
    const history = useHistory();

    //обработчик изменения значения полей формы
    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setForgotPasswordFormValue(e.target.value));
    }


    //обработчик отправки формы
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(submitForgotPassword(email, history));
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
                        errorText={'Ошибка'}
                        size={'default'}
                    />                
            </form>
            <Button disabled={form ? false : true} onClick={() => onButtonClick(form)} type="primary" size="medium">Восстановить</Button>
            <p className={`${forgotPasswordPageStyles.paragraph} text text_type_main-small text_color_inactive mb-4`}>
                Вспомнили пароль? <Link to="/login" className={`${forgotPasswordPageStyles.link}`}>Войти</Link>
            </p>
        </div>
    );    
}