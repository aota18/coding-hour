import { createAction, handleActions } from 'redux-actions';
import * as SessionAPI from '../../lib/api/sessions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

const CHANGE_INPUT = 'session/CHANGE_INPUT';
const INITIALIZE_FORM = 'session/INITIALIZE_FORM';

const CREATE_SESSION='session/CREATE_SESSION';
const WILLJOIN_SESSION = 'session/WILLJOIN_SESSION';
const SESSION_BY_CLASS = 'session/SESSION_BY_CLASS';
const SESSION_BY_SESSIONID= 'session/SESSION_BY_CLASSID';
const SESSION_ATTENDANCE = 'session/SESSION_ATTENDANCE';


export const changeInput= createAction(CHANGE_INPUT); 
export const initializeForm = createAction(INITIALIZE_FORM);

export const createSession = createAction(CREATE_SESSION, SessionAPI.createSession);
export const willjoinSession = createAction(WILLJOIN_SESSION, SessionAPI.willjoinSession);
export const sessionByClass = createAction(SESSION_BY_CLASS, SessionAPI.sessionByClass);
export const sessionBySessionId = createAction(SESSION_BY_SESSIONID, SessionAPI.sessionBySessionId);
export const sessionAttendance = createAction(SESSION_ATTENDANCE, SessionAPI.sessionAttendance);


const initialState = Map({
    create: Map({
        form: Map({
            date: ''
        }),
        error: null
    }),

    result: Map({}),
    sessions: Map({}),
    singleSession: Map({})

})


export default handleActions({

    [INITIALIZE_FORM]: (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    },

    [CHANGE_INPUT]: (state, action) => {
        const {form ,name, value} = action.payload;
        return state.setIn([form, 'form', name], value);
    },

    ...pender({
        type: CREATE_SESSION,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),

    ...pender({
        type: SESSION_BY_CLASS,
        onSuccess: (state, action) => state.set('sessions', Map(action.payload.data))
    }),


    ...pender({
        type: SESSION_BY_SESSIONID,
        onSuccess: (state, action) => state.set('singleSession', Map(action.payload.data))
    }),

    ...pender({
        type: WILLJOIN_SESSION,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),

    ...pender({
        type: SESSION_ATTENDANCE,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    })

}, initialState)

// export const createSession = ({classId, userId, date}) => axios.post(`${addr}:${port}/api/session`, {classId, userId, date});
// export const willjoinSession = (sessionId, userId) => axios.post(`${addr}:${port}/api/session/${sessionId}/willjoin/${userId}`);

// export const sessionByClass = (classId) => axios.get(`${addr}:${port}/api/class/${classId}/session`);
// export const sessionBySessionId = (sessionId) => axios.get(`${addr}:${port}/api/session`);