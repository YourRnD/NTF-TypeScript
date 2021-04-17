import { combineReducers } from 'redux';
import authReducer from './authReducer';
import businessReducer from './businessReducer';
import commonReducer from './commonReducer';
import pointReducer from './pointReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  business: businessReducer,
  point: pointReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
