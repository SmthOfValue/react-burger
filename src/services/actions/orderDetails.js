import { getOrderNumber } from '../../utils/burger-api.js'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

export const SET_ORDER_MODAL = 'SET_ORDER_MODAL';
export const RESET_ORDER_MODAL = 'RESET_ORDER_MODAL';

export function getOrder(orderData) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        const idArray = orderData.data.map((ingredient) => ingredient._id);
        idArray.push(orderData.bun._id);
        getOrderNumber(idArray)
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
        })
        .then(
            dispatch({
                type: SET_ORDER_MODAL
            })
        )
        .catch(error => dispatch(
            {
                type: GET_ORDER_ERROR
            }
        ));
    };
}