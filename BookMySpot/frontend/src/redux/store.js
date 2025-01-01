import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import parkingReducer from './reducers/parkingReducer';
import bookingReducer from './reducers/bookingReducer';

const rootReducer = combineReducers({
  user: userReducer,
  parking: parkingReducer,
  booking: bookingReducer
});

const store = createStore(rootReducer);

export default store;
