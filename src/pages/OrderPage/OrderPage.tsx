import React, {useEffect, FC} from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import orderPageStyles from './OrderPage.module.css';
import {useParams, useLocation, matchPath, useHistory} from 'react-router-dom';
import { USER_WS_CONNECTION_START, WS_CONNECTION_START, WS_CONNECTION_END, USER_WS_CONNECTION_END } from '../../services/actions/wsActionTypes';
import { calculateTotalPrice, formatDate } from '../../utils/utils';
import { WS_URL, USER_WS_URL } from '../../utils/constants';
import { getCookie } from '../../utils/utils';

export const OrderPage: FC = () => {
    
    interface ILocationState {
        background: Location;
    }
    const location = useLocation<ILocationState>();
    const history = useHistory();
    const dispatch = useDispatch();
    //проверка совпадения текущего пути со ссылкой на заказ авторизованного пользователя
    const match = matchPath(location.pathname, {
        path: '/profile/orders/:id',
        exact: false,
        strict: false
    });

    
    
    useEffect(
        () => {
            if (match) {
                dispatch({ 
                    type: USER_WS_CONNECTION_START,
                    payload: `${USER_WS_URL}?token=${getCookie('token')}`
                });
            }
            else if (!(history.action === 'PUSH' && location.state?.background)) {
                dispatch({ 
                    type: WS_CONNECTION_START,
                    payload: WS_URL
                });
            }
            if (match && !location.state?.background) {
                return () => {dispatch({ type: USER_WS_CONNECTION_END });}
            } else if (!location.state?.background) {
                return () => {dispatch({ type: WS_CONNECTION_END });}
            }
        },
        [] 
    );

    type TParamsType = {
        id: string;
    }

    const { id } = useParams<TParamsType>();
    
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const orders = useSelector(store => store.feed.orders);

    const orderData = orders.find(order => order._id === id);

    //представление массива ингредиентов заказа в виде объекта
    //с ключами-ингредиентами и значениями-количеством каждого ингредиента
    const counts: Record<string, number> = {};
    let totalPrice = 0;
    let uniqueIngredients: string[] = [];

    if (orderData) {
        for (const id of orderData.ingredients) {
            counts[id] = counts[id] ? counts[id] + 1 : 1;
        }

        //массив уникальных ингредиентов
        uniqueIngredients = Object.keys(counts).filter((ingredient) => ingredient !== 'null');

        totalPrice = calculateTotalPrice(ingredients, orderData.ingredients);
    }

    

    return (
        <>
        {!orderData &&
            <p className={`text text_type_main-large ${orderPageStyles.loader}`}>Загрузка...</p>}
        {!ingredients &&
            <p className={`text text_type_main-large ${orderPageStyles.loader}`}>Загрузка...</p>}
        {orderData &&
        <section className={`pb-10 ${orderPageStyles.section}`}>
            <p className={`text text_type_digits-default mb-10 ${orderPageStyles.number}`}>#{orderData.number}</p>
            <p className="text text_type_main-medium mb-3">{orderData.name}</p>
            {orderData.status === 'done' &&
            <p className={`text text_type_main-default mb-15 ${orderPageStyles.status_ready}`}>Выполнен</p>}
            {orderData.status === 'pending' &&
            <p className={`text text_type_main-default mb-15 ${orderPageStyles.status_pending}`}>Готовится</p>}
            {orderData.status === 'created' &&
            <p className={`text text_type_main-default mb-15 ${orderPageStyles.status_pending}`}>Создан</p>}            
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <ul className={orderPageStyles.ingredients}>
                {uniqueIngredients.map((uniqueIngredient) => (
                    <li key={uniqueIngredient} className={`${orderPageStyles.ingredient}`}>
                        <div className={orderPageStyles.wrapper}>
                            <img className={orderPageStyles.image} src={ingredients.find((ingredient) => ingredient._id === uniqueIngredient)?.image} alt={ingredients.find((ingredient) => ingredient._id === uniqueIngredient)?.name}/>
                        </div>
                        <p className="text text_type_main-default ml-4 mr-4">{ingredients.find((ingredient) => ingredient._id === uniqueIngredient)?.name}</p>
                        <span className={orderPageStyles.price}>
                            <span className='text text_type_digits-default mr-2'>{counts[uniqueIngredient]} x {ingredients.find((ingredient) => ingredient._id === uniqueIngredient)?.price}</span>
                            <CurrencyIcon type="primary" />
                        </span>
                    </li>
                ))}
            </ul>
            <div className={`mt-10 ${orderPageStyles.footer}`}>
                <span className="text text_type_main-default text_color_inactive">{formatDate(orderData.createdAt)}</span>
                <span className={orderPageStyles.total}>
                    {totalPrice > 0 &&
                        <span className='text text_type_digits-default mr-2'>{totalPrice}</span>}
                        <CurrencyIcon type="primary" />
                    </span>
            </div>
        </section>}
        </>
    )
}