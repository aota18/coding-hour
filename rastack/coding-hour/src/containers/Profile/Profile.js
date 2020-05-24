import React, { Component } from 'react'
import './Profile.css'
import profImg from '../../assets/img/faces/marc.jpg';
import {getProfile} from '../UserFunctions'
import jwt_decode from 'jwt-decode'

export class Profile extends Component {
    constructor(props) {
        super(props)

        // console.log(this.props)
        // this.state = {
        //     userId: this.props.userId,
        //     user: {}
        // }
    }

    componentDidMount() {
        
        // console.log(this.state.userId)
        // getProfile(this.state.userId).then(res => {
        //     if(res.success === true){
        //         this.setState({
        //             user: res.user
        //         })
        //     }else{
        //         alert('Error')
        //     }
            
        // })
    }

    render() {
        return (
            <div className="container">
                <h2>Profile</h2>
                <div className="profileInfo">
                    <div className="thumbnail">
                        <img src={profImg} alt="Thumbnail"/>
                    </div>
                    <div className="userInfo">
                        <div className="username">SEO SANGWON</div>
                        <div className="email">abc@gmail.com</div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Profile

