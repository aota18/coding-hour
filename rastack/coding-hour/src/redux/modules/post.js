import { createAction, handleActions } from 'redux-actions';
import * as PostAPI from '../../lib/api/post';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

const CHANGE_INPUT = 'post/CHANGE_INPUT';
const INITIALIZE_FORM = 'post/INITIALIZE_FORM';

const GET_POST_BY_CLASSID = 'post/GET_POST_BY_CLASSID';
const GET_POST_BY_POSTID = 'post/GET_POST_BY_POSTID';

const CREATE_POST='post/CREATE_POST';

export const changeInput= createAction(CHANGE_INPUT); 
export const initializeForm = createAction(INITIALIZE_FORM);
export const createPost= createAction(CREATE_POST, PostAPI.createPost); 
export const getPostByClassId = createAction(GET_POST_BY_CLASSID, PostAPI.getPostByClassId);
export const getPostByPostId = createAction(GET_POST_BY_POSTID, PostAPI.getPostByPostId);

const initialState = Map({
    create: Map({
        form: Map({
            type: '',
            title: '',
            body: '',
        }),
        error: null
    }),

    result: Map({}),
    posts: Map({}),
    singlePost: Map({})

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
        type: CREATE_POST,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),

    ...pender({
        type: GET_POST_BY_CLASSID,
        onSuccess: (state, action) => state.set('posts', Map(action.payload.data))
    }),

    ...pender({
        type: GET_POST_BY_POSTID,
        onSuccess: (state, action) => state.set('singlePost', Map(action.payload.data))
    })

}, initialState)