import React from 'react'
import {Link} from 'react-router-dom'
import './Sidebar.css'
function Sidebar() {


    return (
        <div className="SideContainer">
            <div className="listContainer">
                <ul className="MenuList">
                    <Link className="listItem" to="/home/class/create">Create Class</Link>
                    <Link className="listItem" to="/home/class/join">Join Class</Link>
                    <Link className="listItem" to="/home/class/main"> Class Main</Link>
                    <Link className="listItem" to="/home/class/info"> Class Info</Link>
                    <Link className="listItem" to="/home/post/view"> View Post</Link>
                    <Link className="listItem" to="/home/post/create"> Create Post</Link>
                    <Link className="listItem"> Profile</Link>

                </ul>
            </div>
        </div>
    )
}

export default Sidebar
