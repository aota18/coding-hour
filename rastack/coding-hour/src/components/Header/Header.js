import React, { Component } from 'react'
import './header.css';
import logo from '../../theme/img/logo.png';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
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
                                {/*<li><a href="./speaker.html">Speakers</a>
                                    <ul className="dropdown">
                                        <li><a href="#">Jayden</a></li>
                                        <li><a href="#">Sara</a></li>
                                        <li><a href="#">Emma</a></li>
                                        <li><a href="#">Harriet</a></li>
                                    </ul>
                                 </li>*/}
        
                            </ul>
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
