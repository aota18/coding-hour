import { combineReducers} from 'redux';
import base from './base';
import auth from './auth';
import user from './user';
import post from './post';
import classes from './classes';
import { penderReducer } from 'redux-pender';

export default combineReducers({
    base,
    auth,
    user,
    classes,
    post,
    pender: penderReducer
});

