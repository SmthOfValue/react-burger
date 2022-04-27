import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './appHeader.module.css';

const AppHeader = () => {
    return(
        <header className={`m-10  ${ appHeaderStyles.header }`}>
            <div className={appHeaderStyles.content}>
                <nav className={appHeaderStyles.nav}>
                    <ul className={ `text text_type_main-default ${ appHeaderStyles.list}` }>
                        <li className={`pr-5 pl-5 pt-4 pb-4 mr-2 mt-4 mb-4 ${ appHeaderStyles.item }`}>
                            <BurgerIcon type="primary" />
                            <span className="ml-2">
                                Конструктор
                            </span>
                        </li>
                        <li className={`pr-5 pl-5 pt-4 pb-4 mt-4 mb-4 ${ appHeaderStyles.item }`}>
                            <ListIcon type="secondary" />
                            <span className="ml-2 text_color_inactive">
                                Лента заказов
                            </span>
                        </li>
                    </ul>
                </nav>
                <div className={appHeaderStyles.logo}>
                    <Logo />
                </div>
                <a className={`pr-5 pl-5 pt-4 pb-4 mt-4 mb-4 ${ appHeaderStyles.link }`}>
                    <ProfileIcon type="secondary" />
                    <span className="ml-3 text text_type_main-default text_color_inactive">
                        Личный кабинет
                    </span>
                </a> 
            </div>
        </header>
    )
}

export default AppHeader;