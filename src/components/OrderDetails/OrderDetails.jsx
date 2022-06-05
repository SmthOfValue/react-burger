import React from 'react';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetailsStyles from './OrderDetails.module.css';
import { useSelector } from 'react-redux';

const OrderDetails = ({}) => {

    const {order, orderError} = useSelector(store => store.order)

    return (
        <div className={`pt-4 pb-30 ${OrderDetailsStyles.container}`}>
            {!orderError
                ? <p className='text text_type_digits-large'>{order.number}</p>
                : <p className='text text_type_main-default'>Что-то пошло не так, попробуйте переоформить заказ</p>
            }
            <p className='mt-8 text text_type_main-default'>идентификатор заказа</p>
            <div className={`mt-15 mb-15 ${OrderDetailsStyles.done}`}></div>
            <p className='text text_type_main-small'>Ваш заказ начали готовить</p>
            <p className='mt-2 text text_type_main-small text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}



export default OrderDetails;