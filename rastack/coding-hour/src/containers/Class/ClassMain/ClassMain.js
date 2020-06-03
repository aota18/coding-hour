import React, {Component} from 'react'
import './ClassMain.css';
import { Route, Link} from 'react-router-dom';
import { Dashboard } from './Dashboard'
import { Settings} from './Settings/Settings'
import { Sessions } from './Sessions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as classActions from '../../../redux/modules/classes';


export class ClassMain extends Component {

    constructor(props) {
        
        super(props)
  

        this.state = {
            isRendered: false,
            menu: 0
        };

        this.changeMenu = this.changeMenu.bind(this);
      }

      componentWillMount(){
          this.getClass().then(() => {
              this.setState({
                  isRendered:true
              })
          });
      }
      componentDidUpdate(prevProps){
        if (this.props.match.params.classId !== prevProps.match.params.classId) {
            this.getClass().then(() => {

                this.setState({
                    isRendered: false
                })
                this.changeMenu(0);

        
            });

            
        }

      }


    changeMenu(num){
        this.setState(()=> ({
            isRendered: true,
            menu:num
        }))
    }

    showMenu = () => {
        if(this.state.menu==0) return <Dashboard classId={this.props.match.params.classId}/>
        else if( this.state.menu==1 ) return <Sessions classId={this.props.match.params.classId}/>
        else return <Settings/>
    }

    getClass = async () => {
        const { ClassActions} = this.props;
        const classId = this.props.match.params.classId;
        
        try {
          await ClassActions.classByClassId(classId);
        }
        catch (e) {
            console.log('a');
           
        }
    }

    render(){
      
        const {data} = this.props.result.toJS();

        return (
            <div className="container">
                <div className="class__header">
                    <div className="class__header__info">
                        <div className="class__title">
                            {data == undefined ? ' ' : data.clazz.name} 
                        </div>

                        <div className="class__semester">
                            {data == undefined ? ' ' : `${data.clazz.year} - ${data.clazz.semester}`}
                        </div>

                        <div className="class__members">
                        {data == undefined ? ' ' : `${data.clazz.participants.length} members`} 
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
                    {this.state.isRendered ? this.showMenu() : 'Loading...'}
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        result: state.classes.get('result'),

    }),
    (dispatch) => ({
        ClassActions: bindActionCreators(classActions, dispatch)
    })
)(ClassMain)

