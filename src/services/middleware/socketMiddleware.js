import {refreshTokenRequest} from '../../utils/burger-api.js';

export const socketMiddlewareWithReconnect = (wsActions, userWsActions) => {
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
        let socket = null;
        let userSocket = null;
        let socketIsConnected = false;
        let userSocketIsConnected = false;
        let socketReconnectTimer = 0;
        let userSocketReconnectTimer = 0;
        let socketUrl = "";
        let userSocketUrl = "";
  
        return (next) => (action) => {
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
                    socketReconnectTimer = setTimeout(() => {
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
                    userSocketReconnectTimer = setTimeout(() => {
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