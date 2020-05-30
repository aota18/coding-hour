import { combineReducers} from 'redux';
import base from './base';
import auth from './auth';
import user from './user';
import classes from './classes';
import { penderReducer } from 'redux-pender';

export default combineReducers({
    base,
    auth,
    user,
    classes,
    pender: penderReducer
});

