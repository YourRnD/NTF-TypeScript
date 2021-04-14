import { combineReducers } from 'redux';
import authReducer from './authReducer';
import businessReducer from './businessReducer';
import commonReducer from './commonReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  business: businessReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
