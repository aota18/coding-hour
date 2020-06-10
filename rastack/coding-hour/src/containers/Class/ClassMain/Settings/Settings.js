import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Settings.css';
import * as classActions from '../../../../redux/modules/classes';
import { bindActionCreators } from 'redux';
import moment from 'moment';



export class Settings extends Component {
    
    render() {
        const { classes } = this.props;
        const classInfo = classes.toJS();
        // console.log(classInfo)

        return (
            <div>
                <h3>Settings</h3>

                <div className="setting__body">
                    <div className="setting__info">
                        
                        <div className="info-classname">
                        <label htmlFor="">Class Name</label>
                            <div className="classname">{classInfo.result.data.clazz.name}</div>
                        </div>

                       
                        <div className="info-semester">
                        <label htmlFor="">Semester</label>
                            <div className="semester">{classInfo.result.data.clazz.year}</div>
                        </div>

                       
                        <div className="info-created">
                        <label htmlFor="">Created</label>
                            <div className="created">{moment(classInfo.result.data.clazz.createdAt).format('YYYY-MM-DD')}</div>
                        </div>

                        
                        <div className="info-members">
                        <label htmlFor="">Members</label>
                            <div className="members">{classInfo.result.data.clazz.participants.length}</div>
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


export default connect(
    (state) => ({
        classes: state.classes
    }),
    (dispatch) => ({
        ClassActions: bindActionCreators(classActions, dispatch)
        
    })
)(Settings);
