import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetailsStyles from './OrderDetails.module.css';

const OrderDetails = ({orderInfo}) => {
    return (
        <div className={`pt-4 pb-30 ${OrderDetailsStyles.container}`}>
            {!orderInfo.error 
                ? <p className='text text_type_digits-large'>{orderInfo.number}</p>
                : <p className='text text_type_main-default'>Что-то пошло не так, попробуйте переоформить заказ</p>
            }
            <p className='mt-8 text text_type_main-default'>идентификатор заказа</p>
            <div className={`mt-15 mb-15 ${OrderDetailsStyles.done}`}></div>
            <p className='text text_type_main-small'>Ваш заказ начали готовить</p>
            <p className='mt-2 text text_type_main-small text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

OrderDetails.propTypes = {
    orderInfo: PropTypes.shape({
        number: PropTypes.number.isRequired,
        error: PropTypes.bool.isRequired
    })   
}

export default OrderDetails;