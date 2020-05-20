import React, { Component } from 'react'
import {getProfile} from '../UserFunctions'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
    constructor(props) {
        super(props)

        console.log(this.props)
        this.state = {
            userId: this.props.userId,
            user: {}
        }
    }

    componentDidMount() {
        
        console.log(this.state.userId)
        getProfile(this.state.userId).then(res => {
            if(res.success === true){
                this.setState({
                    user: res.user
                })
            }else{
                alert('Error')
            }
            
        })
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>User Name</td>
                                <td>{this.state.username}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile