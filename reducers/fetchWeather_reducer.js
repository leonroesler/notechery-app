import {
  LOAD_DATA,
  FETCHING_COMPLETE
} from '../actions/types';

const INITIAL_STATE = {
temperature: 0,
windDirection: '',
windSpeed: 0,
weatherCondition: '',
isLoading: false
};

// whenever this reducer is called by an action creator, it will return the current payload
// in this case the ID of the data set
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return { ...state, isLoading: true};
    case FETCHING_COMPLETE:
    return { ...state, temperature: action.payload.temperature, windDirection: action.payload.windDirection, windSpeed: action.payload.windSpeed, isLoading: false}
    default:
      return state;
  }
};
