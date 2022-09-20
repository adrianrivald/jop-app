import { combineReducers } from 'redux';
import materialReducer from './materialReducer';

export const rootReducer = combineReducers({
    material_input: materialReducer,
  });

export const withCombineReducers = combineReducers({
    material_input: materialReducer,
});

