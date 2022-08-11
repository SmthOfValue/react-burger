import { rootReducer } from './reducers/reducers';
import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook
} from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { socketMiddlewareWithReconnect } from './middleware/socketMiddleware';
import thunk from 'redux-thunk';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
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
} from './actions/wsActionTypes';
import type { TBurgerConstructorActions } from './actions/burgerConstructor';
import type { TForgotPasswordActions } from './actions/forgotPassword';
import type { TFormsActions } from './actions/forms';
import type { TIngredientsActions } from './actions/ingredients';
import type { TLoginActions } from './actions/login';
import type { TOrderDetailsActions } from './actions/orderDetails';
import type { TProfileActions } from './actions/profile';
import type { TRegistrationActions } from './actions/registration';
import type { TResetPasswordActions } from './actions/resetPassword';
import type { TWebSocketActions } from './actions/wsActionTypes';

export type RootState = ReturnType<typeof rootReducer>;

type TApplicationActions = 
| TBurgerConstructorActions
| TForgotPasswordActions
| TFormsActions
| TIngredientsActions
| TLoginActions
| TOrderDetailsActions
| TProfileActions
| TRegistrationActions
| TResetPasswordActions
| TWebSocketActions;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch>();

export type TWsActions = {
  onWsClose: typeof WS_CONNECTION_CLOSED;
  onWsError: typeof WS_CONNECTION_ERROR;
  wsInit: typeof WS_CONNECTION_START;
  onWsOpen: typeof WS_CONNECTION_SUCCESS;
  wsGetOrders: typeof WS_GET_ORDERS;
  wsClose: typeof WS_CONNECTION_END;
};

const wsActions: TWsActions = {
  onWsClose: WS_CONNECTION_CLOSED,
  onWsError: WS_CONNECTION_ERROR,
  wsInit: WS_CONNECTION_START,
  onWsOpen: WS_CONNECTION_SUCCESS,
  wsGetOrders: WS_GET_ORDERS,
  wsClose: WS_CONNECTION_END
};

export type TUserWsActions = {
  userWsInit: typeof USER_WS_CONNECTION_START;
  userWsGetOrders: typeof USER_WS_GET_ORDERS;
  onUserWsOpen: typeof USER_WS_CONNECTION_SUCCESS;
  onUserWsClose: typeof USER_WS_CONNECTION_CLOSED;
  userWsClose: typeof USER_WS_CONNECTION_END;
  onUserWsError: typeof USER_WS_CONNECTION_ERROR;
};

const userWsActions: TUserWsActions = {
  userWsInit: USER_WS_CONNECTION_START,
  userWsGetOrders: USER_WS_GET_ORDERS,
  onUserWsOpen: USER_WS_CONNECTION_SUCCESS,
  onUserWsClose: USER_WS_CONNECTION_CLOSED,
  userWsClose: USER_WS_CONNECTION_END,
  onUserWsError: USER_WS_CONNECTION_ERROR
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose; 

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddlewareWithReconnect(wsActions, userWsActions)));
export const store = createStore(rootReducer, enhancer); 