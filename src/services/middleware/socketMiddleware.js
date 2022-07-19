import {getCookie} from '../../utils/utils.js';

export const socketMiddleware = (wsUrl, userWsUrl, wsActions) => {
    const accessToken = getCookie('token');

    return store => {
      let socket = null;
  
      return next => action => {
        const { dispatch } = store;
        const { type } = action;
        const { wsInit, userWsInit, wsGetOrders, onOpen, onClose, onError, wsClose } = wsActions;
        if (type === wsInit) {
            socket = new WebSocket(`${wsUrl}`);
        }
        if (type === userWsInit) {
            socket = new WebSocket(`${userWsUrl}?token=${accessToken}`);
        }
        if (type === wsClose && socket) {
            socket.close();
        }
        if (socket) {
            socket.onopen = event => {
                dispatch({ type: onOpen, payload: event });
        };
  
        socket.onerror = event => {
            dispatch({ type: onError, payload: event });
        };
  
        socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
  
            dispatch({ type: wsGetOrders, payload: restParsedData });
        };
  
        socket.onclose = event => {
                dispatch({ type: onClose, payload: event });
            };
        }
  
        next(action);
      };
    };
  };