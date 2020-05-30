import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import * as AuthAPI from '../../lib/api/auth';

import { pender } from 'redux-pender';

const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO'; // Login Info Settings
const SET_VALIDATED = 'user/SET_VALIDATED'; // Validated Value Settings

const LOGOUT = 'user/LOGOUT'; //Logout
const CHECK_STATUS = 'user/CHECK_STATUS'; // Check Current Login Status



export const setLoggedInfo = createAction(SET_LOGGED_INFO);
export const setValidated = createAction(SET_VALIDATED);
export const logout = createAction(LOGOUT, AuthAPI.Logout);
export const checkStatus = createAction(CHECK_STATUS, AuthAPI.checkStatus);

const initialState = Map({
    loggedInfo: Map({
        thumbnail: null,
        username: null
    }),
    logged: false,       // Notify if user was logged in or not
    validated: false    // 
});

export default handleActions({
    [SET_LOGGED_INFO]: (state, action) => state.set('loggedInfo', Map(action.payload)).set('logged', true),
    [SET_VALIDATED] : (state, action) => state.set('validated', action.payload),
    ...pender({
        type: CHECK_STATUS,
        onSuccess: (state, action) => state.set('loggedInfo', Map(action.payload.data)).set('validated', true),
        onFailure: (state, action) => initialState
    })
}, initialState)