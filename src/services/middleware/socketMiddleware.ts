import {refreshTokenRequest} from '../../utils/burger-api';
import { Middleware, MiddlewareAPI } from 'redux';
import type { TWsActions, TUserWsActions, AppDispatch, RootState } from '../store';
import type { TWebSocketActions } from '../actions/wsActionTypes';


export const socketMiddlewareWithReconnect = <TActionTypes extends TWsActions | TUserWsActions>(wsActions: TActionTypes): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        const { 
            wsInit,            
            wsGetOrders,            
            onWsOpen,            
            onWsClose,            
            onWsError,            
            wsClose            
        } = wsActions;
        let socket: WebSocket | null = null;
        let socketIsConnected: boolean = false;
        let socketReconnectTimer: number = 0;
        let socketUrl: URL;
  
        return (next) => (action: TWebSocketActions) => {
            const { dispatch } = store;
            const { type } = action;
  
        if (type === wsInit) {
            socketUrl = action.payload;
            socket = new WebSocket(socketUrl);
            socketIsConnected = true;
    
            socket.onopen = event => {
                dispatch({ type: onWsOpen, payload: event });
            };
            socket.onerror = event => {
                dispatch({ type: onWsError, payload: event });
            };
    
            socket.onmessage = (event) => {
                const { data } = event;
                const parsedData = JSON.parse(data);
        
                if (parsedData.message === "Invalid or missing token") {
                    refreshTokenRequest()
                    .then((refreshData) => {
                        const userWsUrl = new URL(socketUrl);
                        userWsUrl.searchParams.set(
                            "token",
                            refreshData.accessToken.replace("Bearer ", "")
                        );
                        dispatch({
                            type: wsInit,
                            payload: userWsUrl,
                        });
                    })
                    .catch((err) => {
                        dispatch({ type: onWsError, payload: err });
                    });
        
                    dispatch({ type: wsClose });
                    return;
                }
        
                dispatch({
                    type: wsGetOrders,
                    payload: parsedData,
                });
            };
    
            socket.onclose = (event) => {
                dispatch({ type: onWsClose, payload: event });
    
                if (socketIsConnected) {
                    socketReconnectTimer = window.setTimeout(() => {
                        dispatch({
                            type: wsInit,
                            payload: socketUrl,
                        });
                    }, 5000);
                }
            };
        }
    
        if (wsClose && type === wsClose && socket) {
            clearTimeout(socketReconnectTimer);
            socketIsConnected = false;
            socketReconnectTimer = 0;
            socket.close();
        }
  
        next(action);
      };
    };
  };