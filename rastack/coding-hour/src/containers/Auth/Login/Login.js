import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../redux/modules/user';
import * as authActions from '../../../redux/modules/auth';
import './Login.css'
import {Link} from 'react-router-dom'
import { AuthContent, AuthError} from '../../../components/Auth';
import storage from '../../../lib/storage';
import queryString from 'query-string';

class Login extends Component {

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;
        
        AuthActions.changeInput({
            name, 
            value,
            form: 'login'
        });
    }

    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('login')
    }

    componentDidMount(){
        const { location } = this.props;
        const query = queryString.parse(location.search);

        if(query.expired !== undefined) {
            this.setError('Session Expired. Please Login again.')
        }
    }

    setError = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setError({
            form: 'login',
            message
        });
        return false;
    }

   
    handleLocalLogin = async() => {
        const { form, AuthActions, UserActions, history } = this.props;
        const { email, password } = form.toJS();

        try {
            await AuthActions.localLogin({email, password});
            console.log(this.props.result)
            const loggedInfo =this.props.result.toJS();

            UserActions.setLoggedInfo(loggedInfo);
            history.push('/home');
            storage.set('loggedInfo', loggedInfo);
        }
        catch (e) {
            console.log('a');
            this.setError('Wrong Account Info');
        }
    }


    render() {
        console.log(this.props)
        const { email, password}  = this.props.form.toJS();
        const { handleChange, handleLocalLogin } = this;
        const { error } = this.props;

        return (
            <AuthContent title="Login">
                <div>
                    <div className="form-signin">
                    
                        <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
                        
                        <div className="form-group">
                            <label className="sr-only">Email address</label>
                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" value={email} onChange={handleChange} required autoFocus name="email"/>
                        </div>
                        
                        <div className="form-group">
                            <label className="sr-only">Password</label>
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

                        <button className="primary-btn top-btn btn-m" onClick={handleLocalLogin}>SIGN IN</button>

                        <div className="">
                            New to here? <Link className="d-inline-block p-3" to="/auth/register">Sign up</Link>
                        </div>
                        
                    </div>
                </div>
            </AuthContent>
        )
    }
}

export default connect (
    (state) => ({
        form: state.auth.getIn(['login', 'form']),
        error: state.auth.getIn(['login', 'error']),
        result: state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(Login);
