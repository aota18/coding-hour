import React, { Component } from 'react'
import './ViewSession.css';
import { WantJoin } from './WantJoin/WantJoin';
import { Attendance } from './Attendance/Attendance';

import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';


export class ViewSession extends Component {

    constructor(props){
        super(props);

        this.state = {
            isRendered: false,
            menu: 0
        };

        this.changeMenu = this.changeMenu.bind(this);
    }

    showMenu = () => {
        if(this.state.menu==0) return <WantJoin/>
        else  return <Attendance/>;

    }
    

    changeMenu = (num) => {
        this.setState(()=> ({
            isRendered: true,
            menu:num
        }))
    }

    render() {
        return (
            <div className="class__session-item">
                ViewSession

                <div className="view__session__navbar">
                        <ul className="session__nav__list">
                            <li className="session__nav__item" onClick={() => this.changeMenu(0)}>Pre-Attend</li>
                            <li className="session__nav__item" onClick={() => this.changeMenu(1)}>Attendance</li>
                        </ul>
                    </div>  

                <div className="view__session__body">
                    {this.showMenu()}
                </div>
            </div>
        )
    }
}

export default ViewSession
