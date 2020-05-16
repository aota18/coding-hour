import React, { Component } from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import { login } from '../UserFunctions'

class Login extends Component {
    constructor(){
        super()
        this.state = {
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

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if(res) {
                this.props.history.push('/profile')
            }
        })
    }

    /*login(){
        console.log('login');
    }*/

    render() {
        return (
            <div>
                <form className="form-signin" noValidate onSubmit={this.onSubmit}>
                
                    <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
                    
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
                    

                    <button className="primary-btn top-btn btn-m" type="submit">SIGN IN</button>

                    <div className="">
                        New to here? <Link className="d-inline-block p-3" to="/register">Sign up</Link>
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default Login
