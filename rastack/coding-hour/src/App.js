import React, { Component } from 'react'
import logo from './logo.svg'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'


/* CSS IMPORT */
import './App.css'
import './theme/css/bootstrap.min.css'
import './theme/css/font-awesome.min.css'
import './theme/css/elegant-icons.css'
import './theme/css/slicknav.min.css'
import './theme/css/font.css'
import './theme/css/style.css'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Login from './containers/Login/Login'
import Home from './containers/Home/home'
import Register from './containers/Register/Register'
import Profile from './containers/Profile/Profile'


/* JS IMPORT */


class App extends Component{
  render(){
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container fluid">
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
