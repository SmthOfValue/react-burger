import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './appHeader.module.css';
import {Link, useLocation} from 'react-router-dom';

const AppHeader = () => {

    const location = useLocation();
    const { pathname } = location;

    const splitLocation = pathname.split("/");
    
    //стили для подсвечивания активных ссылок
    const inactiveLinkStyles = "text text_type_main-default text_color_inactive";
    const activeLinkStyles = `${appHeaderStyles.link_active} text text_type_main-default`;

    return(
        <header className={`m-10  ${ appHeaderStyles.header }`}>
            <div className={appHeaderStyles.content}>
                <nav className={appHeaderStyles.nav}>
                    <ul className={ `text ${ appHeaderStyles.list}` }>
                        <li className={`pr-5 pl-5 pt-4 pb-4 mr-2 mt-4 mb-4`}>
                            <Link
                                className={`${splitLocation[1] === "" ? activeLinkStyles : inactiveLinkStyles} ${appHeaderStyles.link}`}
                                to="/"
                                >
                                <BurgerIcon type={`${splitLocation[1] === "" ? "primary" : "secondary"}`} />
                                <span className="ml-2">
                                    Конструктор
                                </span>
                            </Link>
                        </li>
                        <li className={`pr-5 pl-5 pt-4 pb-4 mt-4 mb-4`}>
                            <Link
                                className={`${splitLocation[1] === "feed" ? activeLinkStyles : inactiveLinkStyles} ${appHeaderStyles.link}`}
                                to="/feed"
                                >
                                <ListIcon type={`${splitLocation[1] === "feed" ? "primary" : "secondary"}`} />
                                <span className="ml-2 text text_type_main-default text_color_inactive">
                                    Лента заказов
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className={appHeaderStyles.logo}>
                    <Logo />
                </div>
                <Link
                    to="/profile"
                    className={`pr-5 pl-5 pt-4 pb-4 mt-4 mb-4 ${ appHeaderStyles.link } ${splitLocation[1] === "profile" ? activeLinkStyles : inactiveLinkStyles}`}
                    >
                    <ProfileIcon type={`${splitLocation[1] === "profile" ? "primary" : "secondary"}`} />
                    <span className="ml-3">
                        Личный кабинет
                    </span>
                </Link> 
            </div>
        </header>
    )
}

export default AppHeader;