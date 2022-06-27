import React, {useState, useRef} from 'react';
import { Typography, Box, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import profilePageStyles from './ProfilePage.module.css';
import {Link} from 'react-router-dom';

export const ProfilePage = () => {
    const [value, setValue] = useState('');
    const passwordRef = React.useRef(null);
    const nameRef = React.useRef(null);
    const loginRef = React.useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
    return (
        <>
            <nav className={`${profilePageStyles.nav} mr-15 mt-30`}>
                <ul className={`${profilePageStyles.list}`}>
                    <li className={profilePageStyles.item}>
                        <Link to="" className={`${profilePageStyles.link} text text_type_main-medium ${profilePageStyles.link_active}`}>
                            Профиль
                        </Link>
                    </li>
                    <li className={profilePageStyles.item}>
                        <Link to="" className={`${profilePageStyles.link} text text_type_main-medium text_color_inactive`}>
                            История заказов
                        </Link>
                    </li>
                    <li className={profilePageStyles.item}>
                        <Link to="" className={`${profilePageStyles.link} text text_type_main-medium text_color_inactive`}>
                            Выход
                        </Link>
                    </li>
                </ul>
                <p className='text text_type_main-default mt-20 text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
            </nav>
            <div className={profilePageStyles.wrapper}>
                <form className={`${profilePageStyles.form} mb-6`}>                
                        <Input                         
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={e => setValue(e.target.value)}
                            value={value}
                            name={'userName'}
                            error={false}
                            ref={nameRef}
                            icon={"EditIcon"}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                        <Input                         
                            type={'text'}
                            placeholder={'Логин'}
                            onChange={e => setValue(e.target.value)}
                            value={value}
                            name={'userLogin'}
                            error={false}
                            ref={loginRef}
                            icon={"EditIcon"}
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
                            ref={passwordRef}
                            icon={"EditIcon"}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                        />                
                </form>
                
            </div>
        </>
    );
    
}