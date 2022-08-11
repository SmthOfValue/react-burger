import { TOrder } from "../../utils/types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const USER_WS_CONNECTION_START: 'USER_WS_CONNECTION_START' = 'USER_WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const USER_WS_CONNECTION_SUCCESS: 'USER_WS_CONNECTION_SUCCESS' = 'USER_WS_CONNECTION_SUCCESS'; 
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const USER_WS_CONNECTION_ERROR: 'USER_WS_CONNECTION_ERROR' = 'USER_WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const USER_WS_CONNECTION_CLOSED: 'USER_WS_CONNECTION_CLOSED' = 'USER_WS_CONNECTION_CLOSED';
export const WS_CONNECTION_END: 'WS_CONNECTION_END' = 'WS_CONNECTION_END';
export const USER_WS_CONNECTION_END: 'USER_WS_CONNECTION_END' = 'USER_WS_CONNECTION_END';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const USER_WS_GET_ORDERS: 'USER_WS_GET_ORDERS' = 'USER_WS_GET_ORDERS';

type TWebSocketResponse = {
    orders: ReadonlyArray<TOrder>;
    total: number;
    totalToday: number;
    success: boolean;
};

interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    payload: string;
}

interface IUserWsConnectionStartAction {
    readonly type: typeof USER_WS_CONNECTION_START;
    payload: string;
}

interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    payload: Event;
}

interface IUserWsConnectionSuccessAction {
    readonly type: typeof USER_WS_CONNECTION_SUCCESS;
    payload: Event;
}

interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    payload: Event;
}

interface IUserWsConnectionErrorAction {
    readonly type: typeof USER_WS_CONNECTION_ERROR;
    payload: Event;
}

interface IWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
    payload: CloseEvent;
}

interface IUserWsConnectionClosedAction {
    readonly type: typeof USER_WS_CONNECTION_CLOSED;
    payload: CloseEvent;
}

interface IWsConnectionEndAction {
    readonly type: typeof WS_CONNECTION_END
}

interface IUserWsConnectionEndAction {
    readonly type: typeof USER_WS_CONNECTION_END
}

interface IWsGetOrdersAction {
    readonly type: typeof WS_GET_ORDERS;
    payload: TWebSocketResponse;
}

interface IUserWsGetOrdersAction {
    readonly type: typeof USER_WS_GET_ORDERS;
    payload: TWebSocketResponse;
}

export type TFeedWebSocketActions = 
    | IWsConnectionStartAction
    | IWsConnectionSuccessAction
    | IWsConnectionErrorAction
    | IWsConnectionClosedAction
    | IWsConnectionEndAction
    | IWsGetOrdersAction
;

export type TProfileOrdersWebSocketActions = 
  | IUserWsConnectionStartAction
  | IUserWsConnectionSuccessAction
  | IUserWsConnectionErrorAction
  | IUserWsConnectionClosedAction
  | IUserWsConnectionEndAction
  | IUserWsGetOrdersAction;

export type TWebSocketActions = TFeedWebSocketActions | TProfileOrdersWebSocketActions;