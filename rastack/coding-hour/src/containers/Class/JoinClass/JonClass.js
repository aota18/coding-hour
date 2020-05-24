import React, { Component } from 'react'

export class JonClass extends Component {
    render() {
        return (
            <div className="container">
                <h3>Join Class</h3>

                <input type="text" placeholder="Enter Class Code"></input>
                <button>Join</button>
            </div>
        )
    }
}

export default JonClass
