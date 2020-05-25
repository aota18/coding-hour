import React from 'react'
import './CreatePost.css'
function CreatePost() {
    return (
        <div className="container">
            <div className="create__post__header">
                <div className="header_title">Notice</div>
                <div className="header_back">Back</div>
                
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

export default CreatePost
