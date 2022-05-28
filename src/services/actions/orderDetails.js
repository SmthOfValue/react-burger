import { getOrderNumber } from '../../utils/burger-api.js'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

export function getOrder() {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        getOrderNumber()
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    order: {
                        name: res.name, 
                        number: res.order.number
                    }
                });
            } else {
                dispatch({
                    type: GET_ORDER_ERROR
                });
            }
        });
    };
}