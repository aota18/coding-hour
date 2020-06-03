import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../../../../redux/modules/session';

import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import './CreateSession.css'

export class CreateSession extends Component {

    constructor(){
        super();

        this.state= {
            stepIdx: 0,
            date: new Date(),
            time: '10:00'
        }

        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChangeTime = this.handleChangeTime.bind(this)
    }

    handleChangeDate = date => {
        this.setState({
           date
        });
    }

    handleChangeTime = time=> {
        this.setState({
            time
        })
    }


    handleCreateSession = async() => {

        const {SessionActions, history, user, classes} = this.props;
        const {loggedInfo} = user.toJS();
        const {result} = classes.toJS();
    
        //Get Input Date
        // let date = new Date(this.state.date, this.state.time);
        const setYear = this.state.date.getFullYear();
        const setMonth = this.state.date.getMonth()+1;
        const setDay = this.state.date.getDay();

        const setDate = new Date(`${setYear}/${setMonth}/${setDay}/${this.state.time}`);
        const userId = loggedInfo.userId;
        const classId  = result.data.clazz._id;

        const sessionForm = {
            date: setDate,
            userId: userId,
            classId: classId
        }
        
        try{
            await SessionActions.createSession(sessionForm).then(()=> {
                alert('Session Created!');
                this.props.closeHandler();
            });

        }catch(e){
            console.log(e);
        }

     
    }


    render() {

        const { handleCreateSession} = this;

        return (
            <div className="class__session-item">
                <h3>Create session</h3>
                <div className="create__session__body">


                    <div className="create-date">
                      <label htmlFor="">Date</label>
                      <DatePicker className="datepicker" selected={this.state.date} onChange={this.handleChangeDate} />
                    </div>

                    <div className="create-time">
                      <label htmlFor="">Time</label>
                      <TimePicker className="timepicker" value={this.state.time} onChange={this.handleChangeTime} />
                    </div>
                </div>
                
                <div className="create__session__footer">
                <button className="btn-done" onClick={handleCreateSession}>Create session</button>
                </div>
                
            </div>
        )
    }
}

export default connect (
    (state) => ({
        user: state.user,
        classes: state.classes,
    }),
    (dispatch) => ({
        SessionActions: bindActionCreators(sessionActions, dispatch)

    })
)(CreateSession)
