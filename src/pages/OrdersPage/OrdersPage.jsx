import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Button, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import ordersPageStyles from './OrdersPage.module.css';

export const OrdersPage =() => {

    return (
        <section>
            <ul className={ordersPageStyles.orders}>
                        <li>
                            <div className={`${ordersPageStyles.card} p-6`}>
                                <div className={`${ordersPageStyles.header} mb-6`}>
                                    <span className="text text_type_digits-default">#123456</span>
                                    <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
                                </div>
                                <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
                                <p className="text text_type_main-default mt-2 mb-6">Создан</p>
                                <div className={ordersPageStyles.contents}>
                                    <ul className={ordersPageStyles.ingredients}>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/bun-01.png'/>
                                        </li>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-04.png'/>
                                        </li>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-03.png'/>
                                        </li>
                                    </ul>
                                    <span className={ordersPageStyles.price}>
                                        <span className='text text_type_digits-default mr-2'>312</span>
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={`${ordersPageStyles.card} p-6`}>
                                <div className={`${ordersPageStyles.header} mb-6`}>
                                    <span className="text text_type_digits-default">#123456</span>
                                    <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
                                </div>
                                <p className="text text_type_main-medium mb-6">Death Star Starship Main бургер</p>
                                <p className="text text_type_main-default mt-2 mb-6">Готовится</p>
                                <div className={ordersPageStyles.contents}>
                                    <ul className={ordersPageStyles.ingredients}>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/bun-01.png'/>
                                        </li>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-04.png'/>
                                        </li>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-03.png'/>
                                        </li>
                                    </ul>
                                    <span className={ordersPageStyles.price}>
                                        <span className='text text_type_digits-default mr-2'>312</span>
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={`${ordersPageStyles.card} p-6`}>
                                <div className={`${ordersPageStyles.header} mb-6`}>
                                    <span className="text text_type_digits-default">#123456</span>
                                    <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
                                </div>
                                <p className="text text_type_main-medium mb-6">Death Star Starship Main бургер</p>
                                <p className="text text_type_main-default mt-2 mb-6">Выполнен</p>
                                <div className={ordersPageStyles.contents}>
                                    <ul className={ordersPageStyles.ingredients}>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/bun-01.png'/>
                                        </li>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-04.png'/>
                                        </li>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-03.png'/>
                                        </li>
                                    </ul>
                                    <span className={ordersPageStyles.price}>
                                        <span className='text text_type_digits-default mr-2'>312</span>
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={`${ordersPageStyles.card} p-6`}>
                                <div className={`${ordersPageStyles.header} mb-6`}>
                                    <span className="text text_type_digits-default">#123456</span>
                                    <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
                                </div>
                                <p className="text text_type_main-medium">Death Star Starship Main бургер</p>
                                <p className="text text_type_main-default mt-2 mb-6">Создан</p>
                                <div className={ordersPageStyles.contents}>
                                    <ul className={ordersPageStyles.ingredients}>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/bun-01.png'/>
                                        </li>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-04.png'/>
                                        </li>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-03.png'/>
                                        </li>
                                    </ul>
                                    <span className={ordersPageStyles.price}>
                                        <span className='text text_type_digits-default mr-2'>312</span>
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={`${ordersPageStyles.card} p-6`}>
                                <div className={`${ordersPageStyles.header} mb-6`}>
                                    <span className="text text_type_digits-default">#123456</span>
                                    <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
                                </div>
                                <p className="text text_type_main-medium mb-6">Death Star Starship Main бургер</p>
                                <p className="text text_type_main-default mt-2 mb-6">Готовится</p>
                                <div className={ordersPageStyles.contents}>
                                    <ul className={ordersPageStyles.ingredients}>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/bun-01.png'/>
                                        </li>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-04.png'/>
                                        </li>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-03.png'/>
                                        </li>
                                    </ul>
                                    <span className={ordersPageStyles.price}>
                                        <span className='text text_type_digits-default mr-2'>312</span>
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={`${ordersPageStyles.card} p-6`}>
                                <div className={`${ordersPageStyles.header} mb-6`}>
                                    <span className="text text_type_digits-default">#123456</span>
                                    <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
                                </div>
                                <p className="text text_type_main-medium mb-6">Death Star Starship Main бургер</p>
                                <p className="text text_type_main-default mt-2 mb-6">Выполнен</p>
                                <div className={ordersPageStyles.contents}>
                                    <ul className={ordersPageStyles.ingredients}>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/bun-01.png'/>
                                        </li>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-04.png'/>
                                        </li>
                                        <li className={ordersPageStyles.wrapper}>
                                            <img className={ordersPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-03.png'/>
                                        </li>
                                    </ul>
                                    <span className={ordersPageStyles.price}>
                                        <span className='text text_type_digits-default mr-2'>312</span>
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </div>
                            </div>
                        </li>                        
                    </ul>            
        </section>
    )
}