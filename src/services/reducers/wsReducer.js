import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
    USER_WS_GET_ORDERS,
    USER_WS_CONNECTION_CLOSED,
    USER_WS_CONNECTION_SUCCESS,
    USER_WS_CONNECTION_ERROR
} from '../actions/wsActionTypes.js';

const initialState = {
    wsConnected: false,
    userWsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: undefined
}

export const wsReducer = (state = initialState, action) => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true,
          error: undefined
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false,
          error: action.payload
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false,
          error: undefined,
          orders: initialState.orders
        };
  
      case WS_GET_ORDERS:
        return {
          ...state,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };

        case USER_WS_CONNECTION_SUCCESS:
        return {
          ...state,
          userWsConnected: true,
          error: undefined
        };
  
      case USER_WS_CONNECTION_ERROR:
        return {
          ...state,
          userWsConnected: false,
          error: action.payload
        };
  
      case USER_WS_CONNECTION_CLOSED:
        return {
          ...state,
          userWsConnected: false,
          error: undefined,
          orders: initialState.orders
        };
  
      case USER_WS_GET_ORDERS:
        return {
          ...state,
          orders: action.payload.orders
        };

      default:
        return state;
    }
};