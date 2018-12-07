import {
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_USER, 
    AUTO_LOGIN_COMPLETE,
    AUTO_LOGIN_FAILED,
    CREATE_ACCOUNT
} from './types'

import firebase from 'firebase';

export const tryAutoLogin = () => {
    return async (dispatch) => {
        try {
           await firebase.auth().onAuthStateChanged( user => {
                if (user) {
                    console.log(' Ein User ist eingeloggt')
                    dispatch({ type: AUTO_LOGIN_COMPLETE, payload: user })
                }  
                   
                else {
                    console.log(' Kein User ist aktuell eingeloggt')
                    dispatch({ type: AUTO_LOGIN_FAILED })
                }
            })
        }
        catch (error) {
            console.log(' Der Aktuelle LOGIN Status konnte nicht ermittelt werden')
        }
    }
}

export const userLogin = (email, password, callback) => {
    return async (dispatch) => {    
        dispatch({type: LOGIN_USER})
        console.log(email,password)
        try {
            await firebase.auth().signInWithEmailAndPassword( email, password)
            console.log('erfolgreich angemeldet')
            dispatch({ type: LOGIN_SUCCESS})
        }
        catch (error) {
            console.log('fehlgeschlagen!!!')
            let errorCode = error.code;
            let errorMessage = ''
            if (errorCode === 'auth/invalid-email') {
            errorMessage = 'Bitte überprüfen Sie Ihre Email-Adresse.';
            } 
            else if (errorCode === 'auth/user-disabled') {
                errorMessage = 'Ungültiger Nutzer.';
            }
            else if (errorCode === 'auth/user-not-found') {
                errorMessage = 'Der Benutzer konnte nicht gefunden werden.';
            }
            else if (errorCode === 'auth/wrong-password') {
                errorMessage = 'Bitte überprüfen Sie Ihr eingegebenes Passwort.';
            }
            else {
            errorMessage
            }
            dispatch({ type: LOGIN_FAILURE, payload: errorMessage})
            callback()
        }
    }
} 

export const createNewUserAccount = (email, password) => {
    return async (dispatch) => {
        try {
            let user = await firebase.auth().createUserWithEmailAndPassword(email,password)
            console.log(email, password)
            console.log(user)
            dispatch({ type: CREATE_ACCOUNT, payload: user})
        }
        catch (error) {console.log(error)}
    }
}

export const userLogout = () => {
    return async (dispatch) => {
        try {
            await firebase.auth().signOut()
            console.log('Der Benutzer wurde ausgeloggt')
            dispatch({ type: LOGOUT_USER})
        }
        catch (error) {
            console.log('Ausloggen fehlgeschlagen')
        }
        
    }
}