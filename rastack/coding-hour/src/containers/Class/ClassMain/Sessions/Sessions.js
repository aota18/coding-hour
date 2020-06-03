import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BsPlusCircle} from 'react-icons/bs';
import { BsXCircle} from 'react-icons/bs';
import { BsCardChecklist } from 'react-icons/bs';
import { BsFillPersonPlusFill} from 'react-icons/bs';
import { CreateSession} from './CreateSession'
import { ViewSession } from './ViewSession'
import * as sessionActions from '../../../../redux/modules/session';

import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

import './Sessions.css'
export class Sessions extends Component {

    
    constructor(props){
        super(props);

        this.state = {
            willJoinCount: 0,
            isWillJoined: false,
            isRendered:false,
            isCreate: false,
            isView: false,
            sessionId: '',
            sessionList: []
        }

        this.openCreate = this.openCreate.bind(this);
        this.openView = this.openView.bind(this);
        this.handleWllJoinSession = this.handleWillJoinSession.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
    }


    componentWillMount(){
        this.getSessions().then(() => {
            this.setState({
                isRendered:true
            })
        });
    }


    componentDidUpdate(prevProps){
        if(this.props.classId !== prevProps.classId){
            this.getSessions().then(() => {
                this.setState({
                    isRendered: true
                })
            });
        }
        
    }

    handleWillJoinSession = async(sessionId) => {
        const { SessionActions, user} = this.props;
        const { loggedInfo } = user.toJS();


        try{
            await SessionActions.willjoinSession(sessionId, loggedInfo.userId).then(() => {
                this.setState({
                    isWillJoined: true
                })
            })
        }catch(e){
            console.log(e);
        }


    }

    getSessions = async() => {
    
        const { SessionActions, session}= this.props;
        
        const {result} = this.props.classes.toJS();
   
        try{


            await SessionActions.sessionByClass(result.data.clazz._id).then(() => {
                const { sessions } = this.props.session.toJS();
            
            let sessionList = sessions.data.sessions.map((session, idx) =>{
            
            const sessionDate = new Date(session.date)
            const sYear = sessionDate.getFullYear();
            const sMonth = sessionDate.getMonth()+1;
            const sDay = sessionDate.getDay();
            const sTime = sessionDate.getHours();
            const sMinutes = sessionDate.getMinutes();

            const dateString = `${sYear}-${sMonth}-${sDay}  ${sTime}:${sMinutes}`;

            if(idx==0){

               return ( <div className="class__session">
                        <div className="class__session-item">
                            <div className="session-tag">{dateString}</div>
                            <div className="session-body">Software Engineering</div>
                            <div className="session-detail">
                                <div className="session-detail-writer">SANGWON SEO</div>
                                <BsCardChecklist className="session-admin" onClick={() => this.openView(session.sessionId)}></BsCardChecklist>

                                <div className="session-join">
                                    <BsFillPersonPlusFill className="btn-join" onClick= {() => {
                                        const sessionId = session.sessionId;
                                        return this.handleWillJoinSession(sessionId)
                                    }}/>&nbsp; {session.willJoinNum}
                                </div>
                                
                            </div>
                        </div>
                </div> )
            }else {
                return (
                    <div className="class__session-disable">
                        <div className="class__session-item">
                            <div className="session-tag">{session.date}</div>
                            <div className="session-body">Software Engineering</div>
                            <div className="session-detail">
                                <div className="session-detail-writer">SANGWON SEO</div>
                                {/* <button className="session-admin" onClick={this.openView}>Admin</button> */}
                                {/* <button className="session-join">{session.willJoinNum}I will Join</button> */}
                            </div>
                        </div>
                </div> 
                )
            }
            
            })

            this.setState({
                sessionList: sessionList
            })
        })

        }catch(e){
            console.log(e);
        }

    }

    openCreate(){
        if(this.state.isCreate){
            this.setState(()=> ({
                isCreate: false
            }))
        }else{
            this.setState(()=> ({
                isCreate: true
            }))
        }
    }

    openView(sessionId){
        if(this.state.isView){
            this.setState(()=> ({
                sessionId: '',
                isView: false
            }))
        }else{
            this.setState(()=> ({
                sessionId: sessionId,
                isView: true
            }))
        }
    }

    closeHandler() {
        this.openCreate();
        this.getSessions();
    }

    createWindow = ()=> {
        if(this.state.isCreate) return <CreateSession closeHandler={this.closeHandler}/>
        else return;
    }

    viewWindow = () => {
        if(this.state.isView ) return <ViewSession sessionId={this.state.sessionId}/>
        else return;
    }

    postCancleToggle = ()=> {
        if(!this.state.isCreate) return <BsPlusCircle className="btn-add" size="24" onClick={this.openCreate}/>
        else return <BsXCircle className="btn-add" size="24" onClick={this.openCreate}/>
    }

  
    render() {
        return (
            <div>
                     <p>Upcoming Sessions</p>
                <div className="session__menu">
           
                      {this.postCancleToggle()}
                    </div>
                 
                {this.createWindow()}
                {
                    this.state.isRendered ? 
                    this.state.sessionList==[] ? <div>Create Your First Session!</div> : this.state.sessionList[0]
                    : 'Loading...'
                }
                {this.viewWindow()}

                  
            
            </div>
        )
    }
}

export default connect (
    (state) => ({
        user: state.user,
        classes: state.classes,
        session: state.session
    }),
    (dispatch) => ({
        SessionActions: bindActionCreators(sessionActions, dispatch)

    })
)(Sessions)
