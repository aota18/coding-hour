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
            participants: [],
            attended: []
        };

        this.getSessionInfo = this.getSessionInfo.bind(this);
        this.getStuList = this.getStuList.bind(this);
        this.initiateAttendList = this.initiateAttendList.bind(this);
    }

    componentWillMount(){
        this.getSessionInfo();
        this.initiateAttendList();
    }

    getSessionInfo = async() => {
        const { SessionActions } = this.props;
        const sessionId = this.props.sessionId;

        try{
            await SessionActions.sessionBySessionId(sessionId).then(() => {

                const { singleSession } = this.props.session.toJS();
                
                console.log(singleSession);

                this.setState({
                    isRendered: true,
                    participants: singleSession.data.participants
                })
            
            })
        }catch(e){
            console.log(e);
        }
    }

    getStuList = () => {
        

        const stuList = this.state.participants.map( (stu, idx) => {
            return (
                <div key={stu.userId} className="stu__item">
                         <div className="stu__thumbnail">
                            <img src={profImg} alt="IMG"/>
                        </div>

                       
                        <div className="stu__username">{stu.username}</div>
                        <div className="button-area">
                            <button className={stu.isAttended ? "btn-attend attended" : "btn-attend"} onClick={() => this.changeAttendance(idx)}>Attend</button>
                            <button className={stu.isAttended ? "btn-absent" : "btn-absent absent"} onClick={() => this.changeAttendance(idx)}>Absent</button>
                        </div>
                        
                    </div>
            )
        })

        return stuList;
    }


    initiateAttendList = () => {
        const attendedList = [];
        this.state.participants.map((stu, idx) => {
            if(stu.isAttended) attendedList.push(stu.userId)
        })

        this.setState({
            attended: attendedList
        });
    }


    changeAttendance = (idx) => {
        
        const attendedList = this.state.attended;
        const stuId = this.state.participants[idx].userId;
        const stuIdIdx = attendedList.indexOf(stuId);

        if(stuIdIdx > -1) attendedList.splice(stuIdIdx, 1);
        else attendedList.push(stuId)

        console.log(attendedList);
        
        const participants = this.state.participants;

        participants[idx].isAttended = !participants[idx].isAttended;

        this.setState({
            attended: attendedList,
            participants: participants
        })
    }


    handleAttendanceCheck = {

    }


   

    render() {
        return (
            <div className="class__session-item">
                Attendance Check
                <div className="attendance__header">
                    Total : {this.state.isRendered ? this.state.participants.length : 0} people
                </div>

                <div className="attendance__body">
                    {this.state.isRendered ? this.getStuList() : <div>Loading...</div>}                 
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
