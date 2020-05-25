import React, { Component } from 'react'
import './JoinClass.css';
export class JonClass extends Component {
    render() {
        return (
            <div className="container">
                <h3>Join Class</h3>

                <div className="join__class__body">
                    <input type="text" placeholder="Enter Class Code"></input>
                </div>
                
                <div className="join__class__footer">
                    <button className="btn-done">Join</button>
                </div>
                
            </div>
        )
    }
}

export default JonClass
