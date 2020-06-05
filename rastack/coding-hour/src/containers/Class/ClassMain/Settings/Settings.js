import React, { Component } from 'react'
import './Settings.css';

export class Settings extends Component {
    render() {
        return (
            <div>
                <h3>Settings</h3>

                <div className="setting__body">
                    <div className="setting__info">
                        
                        <div className="info-classname">
                        <label htmlFor="">Class Name</label>
                            <div className="classname">Software Engineering</div>
                        </div>

                       
                        <div className="info-semester">
                        <label htmlFor="">Semester</label>
                            <div className="semester">2020 Spring</div>
                        </div>

                       
                        <div className="info-created">
                        <label htmlFor="">Created</label>
                            <div className="created">2020 May 5</div>
                        </div>

                        
                        <div className="info-members">
                        <label htmlFor="">Members</label>
                            <div className="members">16 People</div>
                        </div>
                    </div>
                    
                    {/* <div className="setting__admin">
                        <button className="admin-edit">Edit</button>
                        <button className="admin-delete">Delete</button>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default Settings
