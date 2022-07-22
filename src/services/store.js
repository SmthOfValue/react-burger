import { rootReducer } from './reducers/reducers.js';
import { compose, createStore, applyMiddleware } from 'redux';
import { socketMiddlewareWithReconnect } from './middleware/socketMiddleware.js';
import thunk from 'redux-thunk';
import { 
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  USER_WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_END,
  WS_GET_ORDERS,
  USER_WS_CONNECTION_CLOSED,
  USER_WS_CONNECTION_ERROR,
  USER_WS_CONNECTION_SUCCESS,
  USER_WS_CONNECTION_END,
  USER_WS_GET_ORDERS
 } from './actions/wsActionTypes.js';

const wsActions = {
  onWsClose: WS_CONNECTION_CLOSED,
  onWsError: WS_CONNECTION_ERROR,
  wsInit: WS_CONNECTION_START,
  onWsOpen: WS_CONNECTION_SUCCESS,
  wsGetOrders: WS_GET_ORDERS,
  wsClose: WS_CONNECTION_END
  
};

const userWsActions = {
  userWsInit: USER_WS_CONNECTION_START,
  userWsGetOrders: USER_WS_GET_ORDERS,
  onUserWsOpen: USER_WS_CONNECTION_SUCCESS,
  onUserWsClose: USER_WS_CONNECTION_CLOSED,
  userWsClose: USER_WS_CONNECTION_END,
  onUserWsError: USER_WS_CONNECTION_ERROR
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddlewareWithReconnect(wsActions, userWsActions)));
export const store = createStore(rootReducer, enhancer); 