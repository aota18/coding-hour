import { createAction, handleActions } from 'redux-actions';
import * as ClassAPI from '../../lib/api/class';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

const CREATE_CLASS='class/CREATE_CLASS';
const CHANGE_INPUT = 'class/CHANGE_INPUT';


export const changeInput= createAction(CHANGE_INPUT); 

export const createClass = createAction(CREATE_CLASS);


const initialState = Map({
    register: Map({
        form: Map({
            classname: '',
            userId: '',
            year: '',
            semester: '',
            role:''
        }),
        error: null
    }),

    result: Map({})
})

export default handleActions({

    [CHANGE_INPUT]: (state, action) => {
        const {form ,name, value} = action.payload;
        return state.setIn([form, 'form', name], value);
    },
    ...pender({
        type: CREATE_CLASS,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    })
   
}, initialState)