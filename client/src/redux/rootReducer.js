import { combineReducers } from 'redux';
import alertSlice from './slice/alertSlice';

export const rootReducer = combineReducers({
  alert: alertSlice,
});
