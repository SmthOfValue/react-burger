import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Typography, Box, Button, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import feedPageStyles from './FeedPage.module.css';
import { WS_CONNECTION_START, WS_CONNECTION_END } from '../../services/actions/wsActionTypes';
import { generateID, calculateTotalPrice, formatDate} from '../../utils/utils';
import { WS_URL } from '../../utils/constants';


export const FeedPage =() => {

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(
        () => {          
            dispatch({ 
                type: WS_CONNECTION_START,
                payload: WS_URL
            });
            return () => dispatch({ type: WS_CONNECTION_END });
        },
        [] 
    );

    const {orders, total, totalToday, wsConnected} = useSelector(store => store.feed);
    const allIngredients = useSelector(store => store.ingredients.ingredients);
    
    //функция для получения ссылки на изображение ингредиента
    const getImageSrc = (id) => allIngredients.find((ingredient) => ingredient._id === id).image;
    
    return (
        wsConnected ?
        <section className={feedPageStyles.section}>
            <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
            <div className={feedPageStyles.content}> 
                <div className='mr-15'>
                    <ul className={feedPageStyles.orders}>
                        {orders.map((order) => (
                            <Link
                                key={order._id}
                                to={{
                                    pathname: `/feed/${order._id}`,
                                    state: {background: location}
                                }}
                                className={feedPageStyles.link}
                            >
                            <li>
                                <div className={`${feedPageStyles.card} p-6`}>
                                    <div className={`${feedPageStyles.header} mb-6`}>
                                        <span className="text text_type_digits-default">#{order.number}</span>
                                        <span className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</span>
                                    </div>
                                    <p className="text text_type_main-medium mb-6">{order.name}</p>
                                    <div className={feedPageStyles.contents}>
                                        <ul className={feedPageStyles.ingredients}>
                                            {order.ingredients.length>5 &&
                                                <li className={feedPageStyles.wrapper}>                                               
                                                    <img className={feedPageStyles.image} src={getImageSrc(order.ingredients[5])} alt={`Еще ${order.ingredients.length - 5} ингредиентов`}/>
                                                    <p className={`${feedPageStyles.counter} text text_type_digits-default`}>+{order.ingredients.length - 5}</p>
                                                </li>
                                            }
                                            {order.ingredients.map((ingredient, index) => 
                                                (index<=4 && ingredient &&
                                                <li key={index} className={feedPageStyles.wrapper}>
                                                    <img className={feedPageStyles.image} src={getImageSrc(ingredient)} alt={allIngredients.find((item) => item._id === ingredient).name}/>
                                                </li>)
                                            )}
                                        </ul>
                                        <span className={feedPageStyles.price}>
                                            <span className='text text_type_digits-default mr-2'>{calculateTotalPrice(allIngredients, order.ingredients)}</span>
                                            <CurrencyIcon type="primary" />
                                        </span>
                                    </div>
                                </div>
                            </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className={`${feedPageStyles.statuses} mb-15`}>
                        <div className={`${feedPageStyles.status} mr-9`}>
                            <p className="text text_type_main-medium mb-6">Готовы:</p>
                            <ul className={`${feedPageStyles.numbers} ${feedPageStyles.status_ready}`}>
                                {orders.map((order) => (order.status === 'done' &&
                                    <li key={generateID()} className="text text_type_digits-default">
                                        {order.number}
                                    </li>  
                                ))}
                            </ul>
                        </div>
                        <div className={feedPageStyles.status}>
                            <p className="text text_type_main-medium mb-6">В работе:</p>
                            <ul className={`${feedPageStyles.numbers}`}>
                            {orders.map((order) => (order.status === 'created'
                                    ? <li key={generateID()} className="text text_type_digits-default">
                                        {order.number}
                                    </li>   
                                    : order.status === 'pending'
                                    ? <li key={generateID()} className="text text_type_digits-default">
                                        {order.number}
                                    </li> 
                                    : null
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='mb-15'>
                        <p className="text text_type_main-medium">
                            Выполнено за все время:
                        </p>
                        <p className={`${feedPageStyles.digits} text text_type_digits-large`}>
                            {total}
                        </p>
                    </div>
                    <div>
                        <p className="text text_type_main-medium">
                            Выполнено за сегодня:
                        </p>
                        <p className={`${feedPageStyles.digits} text text_type_digits-large`}>
                            {totalToday}
                        </p>
                    </div>
                </div>
            </div>
        </section>
        : <p className={`text text_type_main-large ${feedPageStyles.loader}`} >Загрузка...</p>
    )
}