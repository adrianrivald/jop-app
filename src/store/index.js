import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage/index';
import thunk from 'redux-thunk';
import { withCombineReducers } from './reducers';

const enhancers = [];
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session'],
};

const persistedReducer = persistReducer(persistConfig, withCombineReducers);
const composedEnhancers = compose(applyMiddleware(...middlewares), ...enhancers);

const store = createStore(persistedReducer, {}, composedEnhancers);
const persistor = persistStore(store);

export default store;
export { persistor };
