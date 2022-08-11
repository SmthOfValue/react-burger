import {refreshTokenRequest} from '../../utils/burger-api';
import { ThunkMiddleware } from 'redux-thunk';
import type { TWsActions, TUserWsActions } from '../store';
import type { TWebSocketActions } from '../actions/wsActionTypes';

export const socketMiddlewareWithReconnect = (wsActions: TWsActions, userWsActions: TUserWsActions): ThunkMiddleware => {
    return store => {
        const { 
            wsInit,            
            wsGetOrders,            
            onWsOpen,            
            onWsClose,            
            onWsError,            
            wsClose            
        } = wsActions;
        const {
            userWsInit,
            userWsGetOrders,
            onUserWsOpen,
            onUserWsClose,
            onUserWsError,
            userWsClose
        } = userWsActions;
        let socket: WebSocket | null = null;
        let userSocket: WebSocket | null = null;
        let socketIsConnected: boolean = false;
        let userSocketIsConnected: boolean = false;
        let socketReconnectTimer: number = 0;
        let userSocketReconnectTimer: number = 0;
        let socketUrl: string = "";
        let userSocketUrl: string = "";
  
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

        if (type === userWsInit) {
            userSocketUrl = action.payload;
            userSocket = new WebSocket(userSocketUrl);
            userSocketIsConnected = true;
    
            userSocket.onopen = event => {
                dispatch({ type: onUserWsOpen, payload: event });
            };
            userSocket.onerror = event => {
                dispatch({ type: onUserWsError, payload: event });
            };
    
            userSocket.onmessage = (event) => {
                const { data } = event;
                const parsedData = JSON.parse(data);
        
                if (parsedData.message === "Invalid or missing token") {
                    refreshTokenRequest()
                    .then((refreshData) => {
                        const userWsUrl = new URL(userSocketUrl);
                        userWsUrl.searchParams.set(
                            "token",
                            refreshData.accessToken.replace("Bearer ", "")
                        );
                        dispatch({
                            type: userWsInit,
                            payload: userWsUrl,
                        });
                    })
                    .catch((err) => {
                        dispatch({ type: onUserWsError, payload: err });
                    });
        
                    dispatch({ type: userWsClose });
                    return;
                }
        
                dispatch({
                    type: userWsGetOrders,
                    payload: parsedData,
                });
            };
        
            userSocket.onclose = (event) => {
                dispatch({ type: onUserWsClose, payload: event });
        
                if (userSocketIsConnected) {
                    userSocketReconnectTimer = window.setTimeout(() => {
                    dispatch({
                        type: userWsInit,
                        payload: userSocketUrl,
                    });
                    }, 5000);
                }
                };
        }
    
        if (userWsClose && type === userWsClose && userSocket) {
            clearTimeout(userSocketReconnectTimer);
            userSocketIsConnected = false;
            userSocketReconnectTimer = 0;
            userSocket.close();
        }
  
        next(action);
      };
    };
  };