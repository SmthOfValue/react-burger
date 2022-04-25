import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components'

class AppHeader extends React.Component {
    render() {
        return(
        <header style={{ backgroundColor: '#1C1C21' }} className="pl-40 pr-40 pb-40 pt-40">
            <nav>
                <ul>
                    <li>
                        <BurgerIcon type="primary" />
                    </li>
                    <li>

                    </li>
                    <Logo />
                </ul>
            </nav>
        </header>
        )
    }
}

export default AppHeader;