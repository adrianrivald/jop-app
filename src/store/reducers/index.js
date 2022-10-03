import { combineReducers } from 'redux';
import materialReducer from './materialReducer';
import assignmentReducer from './assignmentReducer';

export const withCombineReducers = combineReducers({
  material_input: materialReducer,
  assignment_mabes: assignmentReducer(),
  assignment_mandor: assignmentReducer(),
});
