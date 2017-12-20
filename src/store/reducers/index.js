import { combineReducers } from 'redux';
import employeesReducer from './employees';

const orgViewApp = combineReducers({
  employeesReducer,
});

export default orgViewApp;
