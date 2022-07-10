import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Button, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import feedPageStyles from './FeedPage.module.css';

export const FeedPage =() => {

    return (
        <section className={feedPageStyles.section}>
            <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
            <div className={feedPageStyles.content}> 
                <div className='mr-15'>
                    <ul className={feedPageStyles.orders}>
                        <li>
                            <div className={`${feedPageStyles.card} p-6`}>
                                <div className={`${feedPageStyles.header} mb-6`}>
                                    <span className="text text_type_digits-default">#123456</span>
                                    <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
                                </div>
                                <p className="text text_type_main-medium mb-6">Death Star Starship Main бургер</p>
                                <div className={feedPageStyles.contents}>
                                    <ul className={feedPageStyles.ingredients}>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/bun-01.png'/>
                                        </li>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-04.png'/>
                                        </li>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-03.png'/>
                                        </li>
                                    </ul>
                                    <span className={feedPageStyles.price}>
                                        <span className='text text_type_digits-default mr-2'>312</span>
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={`${feedPageStyles.card} p-6`}>
                                <div className={`${feedPageStyles.header} mb-6`}>
                                    <span className="text text_type_digits-default">#123456</span>
                                    <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
                                </div>
                                <p className="text text_type_main-medium mb-6">Death Star Starship Main бургер</p>
                                <div className={feedPageStyles.contents}>
                                    <ul className={feedPageStyles.ingredients}>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/bun-01.png'/>
                                        </li>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-04.png'/>
                                        </li>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-03.png'/>
                                        </li>
                                    </ul>
                                    <span className={feedPageStyles.price}>
                                        <span className='text text_type_digits-default mr-2'>312</span>
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={`${feedPageStyles.card} p-6`}>
                                <div className={`${feedPageStyles.header} mb-6`}>
                                    <span className="text text_type_digits-default">#123456</span>
                                    <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
                                </div>
                                <p className="text text_type_main-medium mb-6">Death Star Starship Main бургер</p>
                                <div className={feedPageStyles.contents}>
                                    <ul className={feedPageStyles.ingredients}>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/bun-01.png'/>
                                        </li>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-04.png'/>
                                        </li>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-03.png'/>
                                        </li>
                                    </ul>
                                    <span className={feedPageStyles.price}>
                                        <span className='text text_type_digits-default mr-2'>312</span>
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={`${feedPageStyles.card} p-6`}>
                                <div className={`${feedPageStyles.header} mb-6`}>
                                    <span className="text text_type_digits-default">#123456</span>
                                    <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
                                </div>
                                <p className="text text_type_main-medium mb-6">Death Star Starship Main бургер</p>
                                <div className={feedPageStyles.contents}>
                                    <ul className={feedPageStyles.ingredients}>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/bun-01.png'/>
                                        </li>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-04.png'/>
                                        </li>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-03.png'/>
                                        </li>
                                    </ul>
                                    <span className={feedPageStyles.price}>
                                        <span className='text text_type_digits-default mr-2'>312</span>
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={`${feedPageStyles.card} p-6`}>
                                <div className={`${feedPageStyles.header} mb-6`}>
                                    <span className="text text_type_digits-default">#123456</span>
                                    <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
                                </div>
                                <p className="text text_type_main-medium mb-6">Death Star Starship Main бургер</p>
                                <div className={feedPageStyles.contents}>
                                    <ul className={feedPageStyles.ingredients}>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/bun-01.png'/>
                                        </li>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-04.png'/>
                                        </li>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-03.png'/>
                                        </li>
                                    </ul>
                                    <span className={feedPageStyles.price}>
                                        <span className='text text_type_digits-default mr-2'>312</span>
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className={`${feedPageStyles.card} p-6`}>
                                <div className={`${feedPageStyles.header} mb-6`}>
                                    <span className="text text_type_digits-default">#123456</span>
                                    <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
                                </div>
                                <p className="text text_type_main-medium mb-6">Death Star Starship Main бургер</p>
                                <div className={feedPageStyles.contents}>
                                    <ul className={feedPageStyles.ingredients}>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/bun-01.png'/>
                                        </li>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-04.png'/>
                                        </li>
                                        <li className={feedPageStyles.wrapper}>
                                            <img className={feedPageStyles.image} src='https://code.s3.yandex.net/react/code/sauce-03.png'/>
                                        </li>
                                    </ul>
                                    <span className={feedPageStyles.price}>
                                        <span className='text text_type_digits-default mr-2'>312</span>
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className={`${feedPageStyles.statuses} mb-15`}>
                        <div className={`${feedPageStyles.status} mr-9`}>
                            <p className="text text_type_main-medium mb-6">Готовы:</p>
                            <ul className={`${feedPageStyles.numbers} ${feedPageStyles.status_ready}`}>
                                <li className="text text_type_digits-default">
                                    123456
                                </li>
                                <li className="text text_type_digits-default">
                                    556655
                                </li>
                                <li className="text text_type_digits-default">
                                    787568
                                </li>
                                <li className="text text_type_digits-default">
                                    123456
                                </li>
                                <li className="text text_type_digits-default">
                                    556655
                                </li>
                            </ul>
                        </div>
                        <div className={feedPageStyles.status}>
                            <p className="text text_type_main-medium mb-6">В работе:</p>
                            <ul className={`${feedPageStyles.numbers}`}>
                                <li className="text text_type_digits-default">
                                    123456
                                </li>
                                <li className="text text_type_digits-default">
                                    556655
                                </li>
                                <li className="text text_type_digits-default">
                                    787568
                                </li>
                                <li className="text text_type_digits-default">
                                    123456
                                </li>
                                <li className="text text_type_digits-default">
                                    556655
                                </li>
                                <li className="text text_type_digits-default">
                                    787568
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='mb-15'>
                        <p className="text text_type_main-medium">
                            Выполнено за все время:
                        </p>
                        <p className={`${feedPageStyles.digits} text text_type_digits-large`}>
                            12 567
                        </p>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">
                            Выполнено за сегодня:
                        </p>
                        <p className={`${feedPageStyles.digits} text text_type_digits-large`}>
                            123
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}