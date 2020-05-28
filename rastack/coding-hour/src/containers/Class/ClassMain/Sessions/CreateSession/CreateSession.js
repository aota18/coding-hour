import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import './CreateSession.css'

export class CreateSession extends Component {

    constructor(){
        super();

        this.state= {
            stepIdx: 0,
            startDate: new Date(),
            time: '10:00'
        }

        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeTime = this.handleChangeTime.bind(this)
    }

    handleChangeDate = date => {
        this.setState({
            startDate:date
        });
    }

    handleChangeTime = time=> {
        this.setState({
            time
        })
    }


    render() {
        return (
            <div className="class__session-item">
                <h3>Create session</h3>
                <div className="create__session__body">
                    <div className="create-name">
                        <label htmlFor="">Session Name</label>
                        <input type="text" placeholder="session name"/>
                    </div>

                    <div className="create-date">
                      <label htmlFor="">Date</label>
                      <DatePicker className="datepicker" selected={this.state.startDate} onChange={this.handleChangeDate} />
                    </div>

                    <div className="create-time">
                      <label htmlFor="">Time</label>
                      <TimePicker className="timepicker" value={this.state.time} onChange={this.handleChangeTime} />
                    </div>
                </div>
                
                <div className="create__session__footer">
                <button className="btn-done">Create session</button>
                </div>
                
            </div>
        )
    }
}

export default CreateSession
