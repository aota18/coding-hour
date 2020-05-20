import React, { Component } from 'react'
import logo from '../../theme/img/logo.png'
import './HeaderContainer.css'
import {Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as userActions from '../../redux/modules/user';
import { bindActionCreators } from 'redux';
import storage from '../../lib/storage'; 

export class HeaderContainer extends Component {

    handleLogout = async () => {
        const { UserActions } = this.props;
        try {
            await UserActions.logout();
        } catch (e) {
            console.log(e);
        }

        storage.remove('loggedInfo');
        window.location.href= '/';
    }

    render() {
        const { visible, user} = this.props;
        if(!visible) return null;

      


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
                        
                    </nav>
                    { user.get('logged')
                            ? (<div>
                                {user.getIn(['loggedInfo', 'username'])} <div onClick={this.handleLogout}>Logout</div>
                            </div>
                                )
                            : <Link to="/auth/login" className="primary-btn top-btn">SIGN IN</Link>
                        }
                </div>
                <div id="mobile-menu-wrap"></div>
            </div>
        </div>
        )
    }

}

export default connect(
    (state) => ({
        visible: state.base.getIn(['header', 'visible']),
        user: state.user
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(HeaderContainer);
