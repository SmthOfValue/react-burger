import { getOrderNumber } from '../../utils/burger-api';
import type { TIngredient, TConstructorIngredient } from '../../utils/types';
import type { AppThunk } from '../store';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR: 'GET_ORDER_ERROR' = 'GET_ORDER_ERROR';

export const SET_ORDER_MODAL: 'SET_ORDER_MODAL' = 'SET_ORDER_MODAL';
export const RESET_ORDER_MODAL: 'RESET_ORDER_MODAL' = 'RESET_ORDER_MODAL';

interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    order: {
        name: string;
        number: number;
    }
}

interface IGetOrderErrorAction {
    readonly type: typeof GET_ORDER_ERROR;
}

interface ISetOrderModalAction {
    readonly type: typeof SET_ORDER_MODAL;
}

type TOrderData = {
    data: TConstructorIngredient[];
    bun?: TConstructorIngredient;
};

export function getOrder(orderData: TOrderData): AppThunk<Promise<unknown>> {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        dispatch({
            type: SET_ORDER_MODAL
        });        
        const idArray = orderData.data.map((ingredient) => ingredient._id);
        if (orderData.bun) {
            idArray.push(orderData.bun._id);
        }
        return getOrderNumber(idArray)
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
        .catch(error => dispatch(
            {
                type: GET_ORDER_ERROR
            }
        ));
    };
}

interface IResetOrderModalAction {
    readonly type: typeof RESET_ORDER_MODAL;
};

export const resetOrderModal = (): IResetOrderModalAction => {
    return {
        type: RESET_ORDER_MODAL                   
    }
}

export type TOrderDetailsActions = 
    | IResetOrderModalAction
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderErrorAction
  | ISetOrderModalAction;