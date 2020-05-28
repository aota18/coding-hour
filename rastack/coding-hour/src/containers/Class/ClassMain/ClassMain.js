import React, {Component} from 'react'
import './ClassMain.css';
import { Route, Link} from 'react-router-dom';
import { Dashboard } from './Dashboard/Dashboard'
import { Settings} from './Settings/Settings'
import { Sessions } from './Sessions/Sessions'

export class ClassMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: 0
        };

        this.changeMenu = this.changeMenu.bind(this);
      }

    changeMenu(num){
        console.log(num);
        this.setState(()=> ({
            menu:num
        }))
    }

    showMenu = () => {
        if(this.state.menu==0) return <Dashboard/>
                else if( this.state.menu==1 ) return <Sessions/>
                else return <Settings/>
    }

    render(){
    return (
        <div className="container">
            <div className="class__header">
                <div className="class__header__info">
                    <div className="class__title">
                        Software Engineering
                    </div>

                    <div className="class__semester">
                        20-1
                    </div>

                    <div className="class__members">
                        16 members
                    </div>
                </div>
                <div className="class__header__navbar">
                    <ul className="class__nav__list">
                        <li className="class__nav__item" onClick={() => this.changeMenu(0)}>Dashboard</li>
                        <li className="class__nav__item" onClick={() => this.changeMenu(1)}>Sessions</li>
                        <li className="class__nav__item" onClick={() => this.changeMenu(2)}>Settings</li>
                    </ul>
                </div>  
            </div>
            <div className="class__body">
                {this.showMenu()}
            </div>
        </div>
    )
    }
}

export default ClassMain
