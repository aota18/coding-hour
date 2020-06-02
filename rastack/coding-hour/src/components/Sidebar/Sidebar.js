import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import * as classActions from '../../redux/modules/classes';
import { BsBoxArrowInRight } from 'react-icons/bs'
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import './Sidebar.css'
export class Sidebar extends Component {

    constructor(props){
        super(props);

        this.state = {
            classList: []
        }
    }


    componentWillMount(){
        this.showClassList();
    }

    componentDidUpdate(prevProps, prevState){
        // const { classes } = this.props;
        // const { userClass} = classes.toJS();
        // const classList = userClass.data.class;

        // const classItems = classList.map((cl) => 
        // <Link key={cl.classId} className="listItem" to={{ pathname: `/home/class/main/${cl.classId}`}} >{cl.name}</Link>
        // )
        
        // this.setState({
        //     classList: classItems
        // })
    }

    showClassList (){
        
        const { ClassActions, user} = this.props;
        const userInfo = user.toJS();
        console.log(userInfo)
        const userId = userInfo.loggedInfo.userId;
        let classItems='';

        
        ClassActions.classByUser(userId).then(() => {

            const { classes } = this.props;
            const { userClass} = classes.toJS();
            const classList = userClass.data.class;
    
            classItems = classList.map((cl) => 
            <Link key={cl.classId} className="listItem" to={{ pathname: `/home/class/main/${cl.classId}`}} >{cl.name}</Link>
            )
            
            this.setState({
                classList: classItems
            })
            
            
        });
        


    }

    render(){

        return (
            <div className="SideContainer">
                <div className="listContainer">
                    <ul className="MenuList">
                        <Link key="create" className="listItem" to="/home/class/create">
                            <BsFillPlusSquareFill/> &nbsp; Create Classs
                        </Link>
                        <Link key="join" className="listItem" to="/home/class/join">
                            <BsBoxArrowInRight /> &nbsp; Join Class
                        </Link>
                        {this.state.classList == [] ? ' ' : this.state.classList}

                    </ul>
                </div>
            </div>
        )
    }
}



export default connect (
    (state) => ({
        user: state.user,
        classes: state.classes
    }),
    (dispatch) => ({
        ClassActions: bindActionCreators(classActions, dispatch)
    })
)(Sidebar);
