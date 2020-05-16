import React, { Component } from 'react'
import './header.css'
import logo from '../../theme/img/logo.png'
import {Link, withRouter } from 'react-router-dom'

class Header extends Component {
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
      }    
    render() {
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        )

        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        User
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        )
        return (
            <div className="header-section">
                  <div className="container">
                    <div className="logo">
                        <Link to="/home">
                            <img src={logo} alt=""></img>
                        </Link>
                    </div>
                    <div className="nav-menu">
                        <nav className="mainmenu mobile-menu">
                            <ul>
                                <li className="active"><Link to="/home">Home</Link></li>
                            </ul>
                            {localStorage.usertoken ? userLink : loginRegLink}
                        </nav>
                        <Link to="/login" className="primary-btn top-btn">SIGN IN</Link>
                    </div>
                    <div id="mobile-menu-wrap"></div>
                </div>
            </div>
        )
    }
}

export default Header