import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Button, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { USER_WS_CONNECTION_START, USER_WS_CONNECTION_END } from '../../services/actions/wsActionTypes';
import ordersPageStyles from './OrdersPage.module.css';
import { calculateTotalPrice, formatDate, getCookie } from '../../utils/utils';
import { USER_WS_URL } from '../../utils/constants';



export const OrdersPage =() => {

    const dispatch = useDispatch();
    const location = useLocation();
    const {orders, userWsConnected} = useSelector(store => store.feed);
    const allIngredients = useSelector(store => store.ingredients.ingredients);

    useEffect(
        () => {          
            dispatch({ 
                type: USER_WS_CONNECTION_START,
                payload: `${USER_WS_URL}?token=${getCookie('token')}`
            });
            return () => dispatch({ type: USER_WS_CONNECTION_END });
            
        },
        [] 
    );

    
    //функция для получения ссылки на изображение ингредиента
    const getImageSrc = (id) => allIngredients.find((ingredient) => ingredient._id === id).image;

    return (
        orders && userWsConnected ?
        <section>
            {orders.length > 0 ?
            <ul className={ordersPageStyles.orders}>
                {orders.map((order) => (
                    <Link
                        key={order._id}
                        to={{
                                pathname: `/profile/orders/${order._id}`,
                                state: {background: location}
                            }}
                        className={ordersPageStyles.link}
                    >
                        <li>
                            <div className={`${ordersPageStyles.card} p-6`}>
                                <div className={`${ordersPageStyles.header} mb-6`}>
                                    <span className="text text_type_digits-default">#{order.number}</span>
                                    <span className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</span>
                                </div>
                                <p className="text text_type_main-medium mb-6">{order.name}</p>
                                {order.status === 'done' &&
                                <p className={`text text_type_main-default mt-2 mb-6 ${ordersPageStyles.status_ready}`}>Выполнен</p>}
                                {order.status === 'pending' &&
                                <p className={`text text_type_main-default mt-2 mb-6 ${ordersPageStyles.status_pending}`}>Готовится</p>}
                                {order.status === 'created' &&
                                <p className={`text text_type_main-default mt-2 mb-6 ${ordersPageStyles.status_pending}`}>Создан</p>}   
                                <div className={ordersPageStyles.contents}>
                                    <ul className={ordersPageStyles.ingredients}>
                                        {order.ingredients.length>5 &&
                                            <li className={ordersPageStyles.wrapper}>                                               
                                                <img className={ordersPageStyles.image} src={getImageSrc(order.ingredients[5])} alt={`Еще ${order.ingredients.length - 5} ингредиентов`}/>
                                                <p className={`${ordersPageStyles.counter} text text_type_digits-default`}>+{order.ingredients.length - 5}</p>
                                            </li>
                                        }
                                        {order.ingredients.map((ingredient, index) => 
                                            (index<=4 && ingredient &&
                                            <li key={index} className={ordersPageStyles.wrapper}>
                                                <img className={ordersPageStyles.image} src={getImageSrc(ingredient)} alt={allIngredients.find((item) => item._id === ingredient).name}/>
                                            </li>)
                                        )}
                                    </ul>
                                    <span className={ordersPageStyles.price}>
                                        <span className='text text_type_digits-default mr-2'>{calculateTotalPrice(allIngredients, order.ingredients)}</span>
                                        <CurrencyIcon type="primary" />
                                    </span>
                                </div>
                            </div>
                        </li>
                    </Link>
                ))}     
            </ul>
            : <p className="text text_type_main-large" >Вы еще не заказывали в нашей бургерной</p>}        
        </section>
        : <p className={`text text_type_main-large ${ordersPageStyles.loader}`}>Загрузка...</p>
    )
}