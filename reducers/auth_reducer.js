import {
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_USER,
    AUTO_LOGIN_COMPLETE,
    AUTO_LOGIN_FAILED
}
from '../actions/types'

const INITIAL_STATE = {
    loggedIn: null,
    isLoading: false,
    error: '',
    autoLogin: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case LOGIN_USER:
            return { ...state, isLoading: true }
        case LOGIN_SUCCESS:
            return { ...state, error: '', loggedIn: true, isLoading: false }
        case LOGIN_FAILURE:
            return { ...state, error: action.payload, loggedIn: false, isLoading: false }
        case LOGOUT_USER:
            return { ...state, loggedIn: false }
        case AUTO_LOGIN_COMPLETE:
            return { ...state, userdata: action.payload, autoLogin: true}
        case AUTO_LOGIN_FAILED:
            return { ...state, autoLogin: false }
        default:
            return state
    }
}