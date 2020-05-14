import React, { Component } from 'react'
import './Register.css';

import {Link} from 'react-router-dom';

class Register extends Component {

    register(){
        alert('Reister');
    }
    render() {
        return (
            <div>
            <form className="form-signup">
            
                <h1 className="h3 mb-3 font-weight-normal">Become One of Us</h1>
                
                <div className="form-group">
                    <label for="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus name="email"/>
                </div>

                <div className="form-group">
                    <label for="inputUsername" className="sr-only">Username</label>
                    <input type="username" id="inputUsername" className="form-control" placeholder="Username" required name="username"/>
                </div>
                
                <div className="form-group">
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required name="password"/>
                </div>
                <div className="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                

                <button className="primary-btn top-btn btn-m" type="submit" onClick={this.register}>SIGN UP</button>

                <div className="">
                    Already have an account? <Link className="d-inline-block p-3" to="/login">Sign in</Link>
                </div>
                
            </form>
        </div>
        )
    }
}

export default Register
