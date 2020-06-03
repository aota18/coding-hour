import React, { Component } from 'react'
import profImg from '../../../../../assets/img/faces/marc.jpg'
import './ViewSession.css';
 
import * as sessionActions from '../../../../../redux/modules/session';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';


export class ViewSession extends Component {

    constructor(props){
        super(props);

        this.state = {
            isRendered: false,
        };

    }


   

    render() {
        return (
            <div className="class__session-item">
                Attendance Check
                <div className="attendance__header">
                    Total : 16 people
                </div>

                <div className="attendance__body">
                    <div className="stu__item">
                         <div className="stu__thumbnail">
                            <img src={profImg} alt="IMG"/>
                        </div>

                       
                        <div className="stu__username">Daniel</div>
                        <div className="button-area">
                            <button className="btn-attend">Attend</button>
                            <button className="btn-absent">Absent</button>
                        </div>
                        
                    </div>

                    <div className="stu__item">
                         <div className="stu__thumbnail">
                            <img src={profImg} alt="IMG"/>
                        </div>
                        <div className="stu__username">Daniel</div>
                        
                        <div className="button-area">
                            <button className="btn-attend">Attend</button>
                            <button className="btn-absent">Absent</button>
                        </div>
                        
                    </div>

                    <div className="stu__item">
                         <div className="stu__thumbnail">
                            <img src={profImg} alt="IMG"/>
                        </div>
                        <div className="stu__username">Daniel</div>
                        
                        <div className="button-area">
                            <button className="btn-attend">Attend</button>
                            <button className="btn-absent">Absent</button>
                        </div>
                    </div>
                 
                </div>

                <div className="attendance__footer">
                    <button className="btn-confirm">Done</button>
                </div>
      

            </div>
        )
    }
}

export default connect(
    (state) => ({
        session: state.session
    }),
    (dispatch) => ({
        SessionActions: bindActionCreators(sessionActions, dispatch)
    })
)(ViewSession)
