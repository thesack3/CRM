import { combineReducers } from 'redux';
import alertSlice from './slice/alertSlice';
import authSlice from './slice/authSlice';

export const rootReducer = combineReducers({
  alert: alertSlice,
  auth: authSlice,
});
