import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { BsBoxArrowInRight } from 'react-icons/bs'
import { connect } from 'react-redux';
import './Sidebar.css'
export class Sidebar extends Component {

    render(){
        const { classes } = this.props;
        const { userClass} = classes.toJS();
        
        const classList = userClass.data.class;
        console.log(classList)
        return (
            <div className="SideContainer">
                <div className="listContainer">
                    <ul className="MenuList">
                        <Link className="listItem" to="/home/class/create">
                            <BsFillPlusSquareFill/> &nbsp; Create Class
                        </Link>
                        <Link className="listItem" to="/home/class/join">
                            <BsBoxArrowInRight /> &nbsp; Join Class
                        </Link>
                        <Link className="listItem" to="/home/class/main"> Class Main</Link>
                        <Link className="listItem" to="/home/post/view"> View Post</Link>

                    </ul>
                </div>
            </div>
        )
    }
}



export default connect (
    (state) => ({
   
        classes: state.classes
    }),
    (dispatch) => ({

    })
)(Sidebar);
