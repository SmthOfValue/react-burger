import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import orderPageStyles from './OrderPage.module.css';
import {useParams} from 'react-router-dom';

export const OrderPage = () => {

    const { id } = useParams();
    
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const orders = useSelector(store => store.feed.orders);

    const orderData = orders.find(order => order._id === id);

    const counts = {};

    for (const id of orderData.ingredients) {
        counts[id] = counts[id] ? counts[id] + 1 : 1;
    }

    const uniqueIngredients = Object.keys(counts);


    return (
        <>
        {!orderData &&
            <p className={`text text_type_main-large ${orderPageStyles.loader}`}>Загрузка...</p>}
        {orderData &&
        <section className={`${orderPageStyles.section}`}>
            <p className={`text text_type_digits-default mb-10 ${orderPageStyles.number}`}>#{orderData.number}</p>
            <p className="text text_type_main-medium mb-3">{orderData.name}</p>
            <p className={`text text_type_main-default mb-15 ${orderPageStyles.status_ready}`}>{orderData.status}</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <ul className={orderPageStyles.ingredients}>
                {uniqueIngredients.map((uniqueIngredient) => (
                    <li key={uniqueIngredient} className={`${orderPageStyles.ingredient}`}>
                        <div className={orderPageStyles.wrapper}>
                            <img className={orderPageStyles.image} src={ingredients.find((ingredient) => ingredient._id === uniqueIngredient).image}/>
                        </div>
                        <p className="text text_type_main-default ml-4 mr-4">{ingredients.find((ingredient) => ingredient._id === uniqueIngredient).name}</p>
                        <span className={orderPageStyles.price}>
                            <span className='text text_type_digits-default mr-2'>{counts[uniqueIngredient]} x {ingredients.find((ingredient) => ingredient._id === uniqueIngredient).price}</span>
                            <CurrencyIcon type="primary" />
                        </span>
                    </li>
                ))}
            </ul>
            <div className={`mt-10 ${orderPageStyles.footer}`}>
                <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
                <span className={orderPageStyles.total}>
                        <span className='text text_type_digits-default mr-2'>520</span>
                        <CurrencyIcon type="primary" />
                    </span>
            </div>
        </section>}
        </>
    )
}