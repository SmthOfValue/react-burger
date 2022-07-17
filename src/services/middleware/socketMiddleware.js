export const socketMiddleware = (wsUrl, wsActions) => {
    return store => {
      let socket = null;
  
      return next => action => {
        const { dispatch } = store;
        const { type } = action;
        const { wsInit, wsGetOrders, onOpen, onClose, onError } = wsActions;
        if (type === wsInit) {
            socket = new WebSocket(`${wsUrl}`);
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