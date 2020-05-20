import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from '../redux/modules/base';
import { AuthWrapper } from '../components/Auth';
import { Route} from 'react-router-dom';
import { Login, Register} from '../containers/Auth';

export class Auth extends Component {
     //Activate when you enter this page
     componentWillMount(){
        this.props.BaseActions.setHeaderVisibility(false);
    }

    //Activate when you exit this page
    componentWillUnmount(){
        this.props.BaseActions.setHeaderVisibility(true);
    }

    render() {
        return (
            <AuthWrapper>
                <Route path="/auth/login" component = {Login}/>
                <Route path="/auth/register" component = {Register}/>
            </AuthWrapper>
        )
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Auth)