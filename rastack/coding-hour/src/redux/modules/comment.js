import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as CommentAPI from '../../lib/api/comment';


const CHANGE_INPUT = 'comment/CHANGE_INPUT';
const INITIALIZE_FORM = 'comment/INITIALIZE_FORM';

const WRITE_COMMENT = 'comment/WRITE_COMMENT'; // Write New Comment

export const writeComment = createAction(WRITE_COMMENT, CommentAPI.writeComment);

export const changeInput = createAction(CHANGE_INPUT);
export const initializeForm = createAction(INITIALIZE_FORM);

const initialState = Map({
    write: Map({
        form: Map({
            text: ''
        }),
        error: null
    }),
    result: Map({}),
});

export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, 'form', name], value);
    },

    [INITIALIZE_FORM]: (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    },

    ...pender({
        type: WRITE_COMMENT,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    })
    
}, initialState)