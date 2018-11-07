// store all the diffrent reducers in 1 file and make them usable by just calling the directory
import { combineReducers } from 'redux';
import weather from './fetchWeather_reducer';
import auth from './auth_reducer';

// Default boilerplate for upcoming reducers
export default combineReducers({
  // store all the auth information in this variable
  weather,
  auth
});
