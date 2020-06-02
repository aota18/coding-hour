import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BsPlusCircle} from 'react-icons/bs';
import { BsXCircle} from 'react-icons/bs';
import { CreateSession} from './CreateSession/CreateSession'
import { ViewSession } from './ViewSession/ViewSession'
import './Sessions.css'
export class Sessions extends Component {

    
    constructor(props){
        super(props);

        this.state = {
            isCreate: false,
            isView: false
        }

        this.openCreate = this.openCreate.bind(this);
        this.openView = this.openView.bind(this);
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

    openView(){
        if(this.state.isView){
            this.setState(()=> ({
                isView: false
            }))
        }else{
            this.setState(()=> ({
                isView: true
            }))
        }
    }

    createWindow = ()=> {
        if(this.state.isCreate) return <CreateSession />
        else return;
    }

    viewWindow = () => {
        if(this.state.isView ) return <ViewSession />
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
                 <div className="class__session">
                        <div className="class__session-item">
                            <div className="session-tag">Friday, May 5</div>
                            <div className="session-body">Software Engineering</div>
                            <div className="session-detail">
                                <div className="session-detail-writer">SANGWON SEO</div>
                                <button className="session-admin" onClick={this.openView}>Admin</button>
                                <button className="session-join">I will Join</button>
                            </div>
                        </div>
                </div>
                {this.viewWindow()}


                    <div className="class__session-disable">
                        <div className="class__session-item">
                            <div className="session-tag">Friday, May 5</div>
                            <div className="session-body">Software Engineering</div>
                            <div className="session-detail">
                                <div className="session-detail-writer">SANGWON SEO</div>
                                <button className="session-admin">Admin</button>
                                <button className="session-join">I will Join</button>
                            </div>
                        </div>
                    </div>

                    <div className="class__session-disable">
                        <div className="class__session-item">
                            <div className="session-tag">Friday, May 5</div>
                            <div className="session-body">Software Engineering</div>
                            <div className="session-detail">
                                <div className="session-detail-writer">SANGWON SEO</div>
                                <button className="session-admin">Admin</button>
                                <button className="session-join">I will Join</button>
                            </div>
                        </div>
                    </div>

                  
            
            </div>
        )
    }
}

export default Sessions
