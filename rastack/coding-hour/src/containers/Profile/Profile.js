


import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Profile.css'
import profImg from '../../assets/img/faces/marc.jpg';


export class Profile extends Component {


 

    componentDidMount(){
        
    }
 
    
    render() {
        const { user } = this.props;
        const userInfo = user.toJS()
        console.log(userInfo)

        return (
            <div className="container">
            <h2>Profile</h2>
            <div className="profileInfo">
                <div className="thumbnail">
                    <img src={profImg} alt="Thumbnail"/>
                </div>
                <div className="userInfo">
                    {/* <div className="username">{profile.username}</div>
                    <div className="email">{loggedInfo.loggedInfo.email}</div> */}
                </div>
                
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
        
    })
)(Profile);
