import React, { Component } from 'react'

import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom'


/* CSS IMPORT */
import './App.css'
import './theme/css/bootstrap.min.css'
import './theme/css/font-awesome.min.css'
import './theme/css/elegant-icons.css'
import './theme/css/slicknav.min.css'
import './theme/css/font.css'
import './theme/css/style.css'

import HeaderContainer from './containers/HeaderContainer/HeaderContainer'
import FooterContainer from './containers/FooterContainer/FooterContainer';

import Home from './pages/Home'
import Auth from './pages/Auth'
import Docs from './pages/Docs';
import storage from './lib/storage';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from './redux/modules/user';


/* JS IMPORT */


class App extends Component{


  // Check if user has logged in
  initializeUserInfo = async () => {
    const loggedInfo = storage.get('loggedInfo');

    if(!loggedInfo) return;

    const { UserActions } = this.props;
    UserActions.setLoggedInfo(loggedInfo);

    if(!loggedInfo){
      window.location.href = '/auth/login?expired';
    }
    // try{
    //   await UserActions.checkStatus();
    // } catch (e) {
    //   console.log(e);
    //   // storage.remove('loggedInfo');
      
    // }
  }


  componentWillMount(){
    this.initializeUserInfo();
  }
 

  render(){
    return (
   
        <div className="App">
          <HeaderContainer/>
          <div className="container">
            <Route path="/" exact component ={Home}/>
            <Route path="/home" component ={Home} />
            <Route path="/auth" component = {Auth} />
            <Route path="/docs" component = {Docs}/>
           
          </div>
        </div>

    )
  }
}

export default connect (
  null, 
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
) (App);
