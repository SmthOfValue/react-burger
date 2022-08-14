import React, {useState, useRef, useEffect, FC, ReactType} from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import profilePageStyles from './ProfileEditPage.module.css';
import {
    setProfileFormValue,
    setUserInfo
} from '../../services/actions/profile';

export const ProfileEditPage: FC = () => {

    type TIconType = "EditIcon" | "CloseIcon";

    type TInputType = {icon: TIconType; disabled: boolean};
    
    type TInitialStateType = {
        nameInput: TInputType;
        emailInput: TInputType;
        passwordInput: TInputType;
    };
    
    const initialState: TInitialStateType = {
        'nameInput': {
            icon: "EditIcon",
            disabled: true
        },
        'emailInput': {
            icon: "EditIcon",
            disabled: true
        },
        'passwordInput': {
            icon: "EditIcon",
            disabled: true
        }
    }

    const [state, setState] = useState(initialState);
    
    const buttonsRef = useRef<HTMLDivElement>(null);

    const formRef = useRef<HTMLFormElement>(null);
    const form = formRef.current;

    const {email, name, password} = useSelector(state => state.profile.form);
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    
    //обновление формы при изменении данных пользователя
    useEffect(
        () => {
            if ((user.email !=='') && (user.name !=='')) {
                dispatch(setProfileFormValue('email', user.email))
                dispatch(setProfileFormValue('name', user.name))
            }
        },
        [user.email, user.name]
    );

    //обработчик отправки формы
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setUserInfo(email, password, name));
    }

    //обработчик изменения значения полей формы
    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setProfileFormValue(e.target.name, e.target.value));
    }

    //обработчик нажатия на иконку поля
    const onIconClick = (input: keyof TInitialStateType) => {        
        setState({
            ...state,
            [input]: {
                disabled: !state[input].disabled,
                icon: !state[input].disabled ? 'EditIcon' : 'CloseIcon'
            }
        });
    }

    type TStateKeys ='nameInput'| 'emailInput' | 'passwordInput';


    //смена видимости кнопок Сохранить и Отмена в зависимости от состояния полей ввода
    useEffect(
        () => {
            const stateKeysArray: TStateKeys[] = ['nameInput', 'emailInput', 'passwordInput']
            if (stateKeysArray.every(element => state[element].disabled)) {
                if (buttonsRef.current !== null) {
                    buttonsRef.current.classList.add(profilePageStyles.hidden);
                }
            }
            else {
                if (buttonsRef.current !== null) {
                    buttonsRef.current.classList.remove(profilePageStyles.hidden);
                }
            }
        }, 
        [state]); 

    //обработчик нажатия кнопки Отмена
    const onCancelButtonClick = () => {
        dispatch(setProfileFormValue(email, user.email));
        dispatch(setProfileFormValue(name, user.name));
        dispatch(setProfileFormValue(password, 'Пароль'));
        setState(initialState);
    }

    //обработчик нажатия на кнопку Сохранить
    const onSaveButtonClick = () => {
        if (form !== null) {
            form.requestSubmit();
        }
        setState(initialState);
    }


    return (
        <div className={profilePageStyles.wrapper}>            
                <form onSubmit={onFormSubmit} ref={formRef} className={`${profilePageStyles.form} mb-6`}>                
                        <Input                         
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={onFormChange}
                            value={name}
                            name={'name'}
                            error={false}
                            icon={state.nameInput.icon}
                            onIconClick={() => onIconClick('nameInput')}
                            errorText={'Ошибка'}
                            size={'default'}
                            disabled={state.nameInput.disabled}
                        />
                        <Input                         
                            type={'email'}
                            placeholder={'Логин'}
                            onChange={onFormChange}
                            value={email}
                            name={'email'}
                            error={false}
                            icon={state.emailInput.icon}
                            onIconClick={() => onIconClick('emailInput')}
                            errorText={'Ошибка'}
                            size={'default'}
                            disabled={state.emailInput.disabled}
                        />                  
                        <Input 
                            type={'password'}
                            placeholder={'Пароль'}
                            onChange={onFormChange}
                            value={password}
                            name={'password'}
                            error={false}
                            icon={state.passwordInput.icon}
                            onIconClick={() => onIconClick('passwordInput')}
                            errorText={'Ошибка'}
                            size={'default'}
                            disabled={state.passwordInput.disabled}
                        />                
                </form>
                <div className={`${profilePageStyles.buttons}`} ref={buttonsRef}>
                    <Button
                        onClick={onCancelButtonClick}
                        type="secondary"
                        size="medium" 
                    >
                        Отмена
                    </Button>
                    <Button
                        onClick={onSaveButtonClick}
                        type="primary"
                        size="medium"
                    >
                        Сохранить
                    </Button>
                </div>
        </div>
    )

}