import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
    LOAD_DATA,
    FETCHING_COMPLETE
  } from './types';

export const fetchWeather = () => {
  return async (dispatch) => {
    const API_KEY = 'e301329cac87a39714c62dfb61704d11'
    dispatch({ type: LOAD_DATA});

    navigator.geolocation.getCurrentPosition(
     async position => {
          try {
          let result =  await axios({
              method: 'get',
              url: `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=${API_KEY}&units=metric`
            });
  
            let direction = result.data.wind.deg
            switch (true) {
              case (direction >= 337.51 && direction <= 22.5):
                direction = 'Norden';
                break; 
              case(direction >= 22.51 && direction <= 67.5):
                  direction = 'Nord Ost';
                  break;
              case (direction >= 67.51 && direction <= 112.5):
                  direction = 'Osten';
                  break;
              case (direction >= 112.51 && direction <= 157.5):
                  direction = 'Süd Ost';
                  break;
              case (direction >= 157.51 && direction <= 202.5):
                  direction = 'Süden';
                  break;
              case (direction >= 202.51 && direction <= 247.5):
                  direction = 'Süd West';
                  break;
              case (direction >= 247.51 && direction <= 292.5):
                  direction = 'Westen';
                  break;
              case (direction >= 292.51 && direction <= 337.5):
                  direction = 'Nord West';
                  break;
              default:
              direction = 'Nicht definierbar';
              break;
            }
            dispatch({ type: FETCHING_COMPLETE, payload: { temperature: result.data.main.temp, windSpeed: result.data.wind.speed, windDirection: direction, isLoading: false }})
          } catch( error){ console.log('Datenermittlung fehlgeschlagen')}
      
        },
        error => {
          console.log('Die aktuelle Position konnte nicht ermittelt werden');
        }
      );
      }
    }
