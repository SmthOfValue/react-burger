import { rootReducer } from './reducers/reducers.js';
import { compose, createStore, applyMiddleware } from 'redux';
import { socketMiddleware } from './middleware/socketMiddleware.js';
import thunk from 'redux-thunk';
import { 
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  USER_WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_END,
  WS_GET_ORDERS
 } from './actions/wsActionTypes.js';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const userWsUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  wsInit: WS_CONNECTION_START,
  userWsInit: USER_WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  wsGetOrders: WS_GET_ORDERS,
  wsClose: WS_CONNECTION_END
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, userWsUrl, wsActions)));
export const store = createStore(rootReducer, enhancer); 