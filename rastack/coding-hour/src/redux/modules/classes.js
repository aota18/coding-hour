import { createAction, handleActions } from 'redux-actions';
import * as ClassAPI from '../../lib/api/class';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

const CREATE_CLASS='class/CREATE_CLASS';
const CHANGE_INPUT = 'class/CHANGE_INPUT';
const INITIALIZE_FORM = 'class/INITIALIZE_FORM'

const JOIN_CLASS = 'class/JOIN_CLASS';
const CLASS_BY_NAME='class/CLASS_BY_NAME';
const CLASS_BY_USER='class/CLASS_BY_USER';

export const changeInput= createAction(CHANGE_INPUT); 
export const initializeForm = createAction(INITIALIZE_FORM);

export const createClass = createAction(CREATE_CLASS, ClassAPI.createClass);
export const joinClass = createAction(JOIN_CLASS, ClassAPI.joinClass);

export const classByName = createAction(CLASS_BY_NAME, ClassAPI.classByName);
// export const classByUser = createAction(CLASS_BY_USER, ClassAPI.classByUser);

const initialState = Map({
    register: Map({
        form: Map({
            classname: '',
            year: '',
            semester: '',
            role:''
        }),
        error: null
    }),

    join: Map({
        form: Map({
            name: '',
            classId: ''
        })
    }),

    result: Map({}),

    queryResult: Map({}),

    userClass: Map({})
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
        type: CREATE_CLASS,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),

    ...pender({
        type: JOIN_CLASS,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),

    ...pender({
        type: CLASS_BY_NAME,
        onSuccess: (state, action) => state.set('queryResult', Map(action.payload.data))
    }),

    // ...pender({
    //     typs: CLASS_BY_USER,
    //     onSuccess: (state, action) => state.set('userClass', Map(action.payload.data))
    // })
   
}, initialState)