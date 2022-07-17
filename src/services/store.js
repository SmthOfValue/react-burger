import { rootReducer } from './reducers/reducers.js';
import { compose, createStore, applyMiddleware } from 'redux';
import { socketMiddleware } from './middleware/socketMiddleware.js';
import thunk from 'redux-thunk';
import { 
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS
 } from './actions/wsActionTypes.js';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

const wsActions = {
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  wsGetOrders: WS_GET_ORDERS
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));
export const store = createStore(rootReducer, enhancer); 