import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './appHeader.module.css';

class AppHeader extends React.Component {
    render() {
        return(
        <header className={ appHeaderStyles.header }>
            <nav>
                <ul className="text text_type_main-default">
                    <li>
                        <BurgerIcon type="primary" /> <span >Конструктор</span>
                    </li>
                    <li>
                        <ListIcon type="secondary" /> <span className="text_color_inactive">Лента заказов</span>
                    </li>
                </ul>
            </nav>
            <Logo />
        </header>
        )
    }
}

export default AppHeader;