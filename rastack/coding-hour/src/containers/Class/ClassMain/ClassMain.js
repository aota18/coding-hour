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
            menu: 0,
            semesterList: ["Spring", "Summer", "Fall", "Winter"]
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

        // let semester;
        // if(this.state.isRendered){
        //     const {data} = this.props.result.toJS();

        //     semester = data.clazz.semester;

        //     switch(semester){
        //         case 1:
        //             semester = "Spring";
        //             break;
        //         case 2:
        //             semester = "Summer";
        //             break;
        //         case 3:
        //             semester = "Fall";
        //             break;
        //         case 4:
        //             semester = "Winter";
        //             break;
        //         default:
        //             throw "sememster not matched";
        //     }
        // }
      
        return (
            <div className="container">
                <div className="class__header">
                    <div className="class__header__info">
                        <div className="class__title">
                            { !this.state.isRendered ? ' ' : data.clazz.name} 
                        </div>

                        <div className="class__semester">
                            { !this.state.isRendered ? ' ' : `${data.clazz.year} - ${this.state.semesterList[(data.clazz.semester-1)]}`}
                        </div>

                        <div className="class__members">
                         {!this.state.isRendered ? ' ' : `${data.clazz.participants.length} members`} 
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
                    {!this.state.isRendered ? 'Loading...' : this.showMenu()}
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

