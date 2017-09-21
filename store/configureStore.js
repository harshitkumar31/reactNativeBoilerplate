import {
  applyMiddleware,
  compose,
  createStore,
  combineReducers,
} from 'redux';


import { rootReducer } from '../reducers';

import { logger } from './logger';

export const configureStore = (initialState, navReducer) => {
  const middleware = applyMiddleware(logger);
  const appReducer = combineReducers({
    nav: navReducer,
    app: rootReducer,
  });
  const store = createStore(appReducer, initialState, middleware);
  if (module.hot) {
    module.hot.accept(() => {
      const { rootReducer } = require('../reducers');
      store.replaceReducer(rootReducer);
    });
  }
  return store;
};
