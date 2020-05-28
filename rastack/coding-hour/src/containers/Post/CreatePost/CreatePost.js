import React, {Component}from 'react'
import './CreatePost.css'
export class CreatePost extends Component {
    render(){
    return (
        <div className="class__post-item">
            <div className="create__post__header">
                <div className="header_title">Notice</div>
            </div>

            <div className="create__post__body">
                <textarea cols="30" rows="10" placeholder="Write Something..."/>

            </div>

            <div className="create__post__footer">
                <div className="post_submit">Done</div>
            </div>
        </div>
    )
    }
}

export default CreatePost
