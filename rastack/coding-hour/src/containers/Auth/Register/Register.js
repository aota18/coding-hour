import React, { Component } from 'react'
import './Register.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../redux/modules/user';
import * as authActions from '../../../redux/modules/auth';
import {Link} from 'react-router-dom';
import { AuthContent, AuthError} from '../../../components/Auth';
import {isEmail, isLength, isAlphanumeric} from 'validator';
import storage from '../../../lib/storage';
import debounce from 'lodash/debounce';

import 'react-toastify/dist/ReactToastify.css';

class Register extends Component {

    
    constructor(){
        super()

        // this.onSubmit = this.onSubmit.bind(this)
    }
    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('register')
    }

    setError = (message) => {
        const { AuthActions} = this.props;
        AuthActions.setError({
            form: 'register',
            message
        })
    }

    validate = {
        email: (value) => {
            if(!isEmail(value)){
                this.setError('Wrong Email Format');
                return false;
            }
            return true;
        },

        username: (value) =>  {
            if(!isAlphanumeric(value) || !isLength(value, { min:4, max: 15})) {
                this.setError(' Username must be alphanumeric and between 4 and 15 length.');
                return false;
            }
            return true;
        },
        password: (value) => {
            if(!isLength(value, { min : 6})) {
                this.setError('Password must be length 6 at least.');
                return false;
            }
            this.setError(null);
            return true;
        }
    }

    checkEmailExists = debounce( async (email) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkEmailExists(email);
            if(this.props.exists.get('email')) {
                this.setError('Your Email was already registered.');
            } else {
                this.setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    }, 300)

    checkUsernameExists = debounce(async (username) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkUsernameExists(username);
            if(this.props.exists.get('username')) {
                this.setError('This username was already taken.');
            } else {
                this.setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    }, 300)

 
    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;
        
        AuthActions.changeInput({
            name, 
            value,
            form: 'register'
        });

        const validation = this.validate[name](value);
        if(name.indexOf('password') > -1 || !validation) return;

        const check = name === 'email' ? this.checkEmailExists : this.checkUsernameExists; 
        check(value);
    }

    handleRegister = async() => {
        
        const {form, AuthActions, UserActions, error, history} = this.props;
        const { email, username, password } = form.toJS();

        const { validate } = this;

        if(error) return;
        if(!validate['email'](email)
            || !validate['username'](username)
            || !validate['password'](password)){
                return;
        }
        

        try {
            await AuthActions.localRegister({
                email, username, password
            });

            const loggedInfo = this.props.result.toJS();
            console.log(loggedInfo);

            storage.set('loggedInfo', loggedInfo);
            UserActions.setLoggedInfo(loggedInfo);
            UserActions.setValidated(true);

            //Move to Home after you login successfully
             history.push('/');
        }catch (e){
            if(e.response.status === 409) {
                const { key } = e.response.data;
                const message = key === 'email' ? 'Email already Exist' : 'ID Already Exist';
                return this.setError(message);
            }

            this.setError('Unknown Error');
        }
    }

    render() {
        const { error } = this.props;
        const { email, username, password}  = this.props.form.toJS();
        const { handleChange, handleRegister} = this;
   
        return (
            <AuthContent title="Register">
                
                <div className="form-signup">
                
                    <h1 className="h3 mb-3 font-weight-normal">Become One of Us</h1>

                    <div className="form-group">
                        <label  className="sr-only">Username</label>
                        <input type="username" id="inputUsername" className="form-control" placeholder="Username" value={username} onChange={handleChange} required name="username"/>
                    </div>
                    
                    <div className="form-group">
                        <label  className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" value={email} onChange={handleChange} required autoFocus name="email"/>
                    </div>


                    <div className="form-group">
                        <label  className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={password} onChange={handleChange} required name="password"/>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>

                    {
                    error && <AuthError>{error}</AuthError>
                }
                    

                    <button className="primary-btn top-btn btn-m" onClick={handleRegister}>SIGN UP</button>

                    <div className="">
                        Already have an account? <Link className="d-inline-block p-3" to="/auth/login">Sign in</Link>
                    </div>
                    
                </div>
            
        </AuthContent>
        )
    }
}

export default connect (
    (state) => ({
        form: state.auth.getIn(['register', 'form']),
        error: state.auth.getIn(['register', 'error']),
        exists: state.auth.getIn(['register', 'exists']),
        result: state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(Register);
