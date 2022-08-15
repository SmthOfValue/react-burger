import React, {FC} from 'react';
import OrderDetailsStyles from './OrderDetails.module.css';
import { useSelector } from '../../services/store';


const OrderDetails: FC = ({}) => {

    const {order, orderError, orderRequest} = useSelector(store => store.order)

    return (
        <div className={`pt-4 pb-30 ${OrderDetailsStyles.container}`}>
            {orderRequest &&
                <p className={`text text_type_main-large ${OrderDetailsStyles.loader}`}>Оформляем заказ...</p>
            }
            {!orderRequest &&
                <>
                    {!orderError
                        ? <>
                            <p className='text text_type_digits-large'>{order.number}</p>
                            <p className='mt-8 text text_type_main-default'>идентификатор заказа</p>
                            <div className={`mt-15 mb-15 ${OrderDetailsStyles.done}`}></div>
                            <p className='text text_type_main-small'>Ваш заказ начали готовить</p>
                            <p className='mt-2 text text_type_main-small text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
                        </>
                        : <p className='text text_type_main-default'>Что-то пошло не так, попробуйте переоформить заказ</p>
                    }
                </>
            }
        </div>
    );
}



export default OrderDetails;