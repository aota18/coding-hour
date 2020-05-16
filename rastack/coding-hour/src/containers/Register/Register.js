import React, { Component } from 'react'
import './Register.css';

import {Link} from 'react-router-dom';
import { register } from '../UserFunctions'

class Register extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        register(newUser).then(res => {
            this.props.history.push('/login')
        })
    }

    /*register(){
        alert('Reister');
    }*/
    render() {
        return (
            <div>
            <form className="form-signup" noValidate onSubmit={this.onSubmit}>
            
                <h1 className="h3 mb-3 font-weight-normal">Become One of Us</h1>

                <div className="form-group">
                    <label for="inputUsername" className="sr-only">Username</label>
                    <input type="username" id="inputUsername" className="form-control" placeholder="Username" value={this.state.username} onChange={this.onChange} required name="username"/>
                </div>
                
                <div className="form-group">
                    <label for="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" value={this.state.email} onChange={this.onChange} required autoFocus name="email"/>
                </div>


                <div className="form-group">
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={this.state.password} onChange={this.onChange} required name="password"/>
                </div>

                <div className="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                

                <button className="primary-btn top-btn btn-m" type="submit">SIGN UP</button>

                <div className="">
                    Already have an account? <Link className="d-inline-block p-3" to="/login">Sign in</Link>
                </div>
                
            </form>
        </div>
        )
    }
}

export default Register
