import React from 'react'
import './ViewPost.css';
import profImg from '../../../assets/img/faces/marc.jpg';
function ViewPost() {
    return (
        <div className="container">
            <div className="view__post__container flexwrap">
                <div className="post__body">
                    <div className="post__body-classname">Software Engineering</div>

                    <div className="post__body-title">Notice</div>
                    

                    <div className="post__body__content">
                        <div className="post__body-writer">
                            <div className="writer-thumbnail">
                                <img src={profImg} alt="IMG"/>
                            </div>

                            <div className="writer-about">
                                <div className="writer-info">
                                    <div className="writer-name">JC Nam</div>&nbsp;
                                    <div className="writer-auth">Professor</div>
                                </div>
                                <div className="writer-time">a month ago</div>
                            </div>
                            
                        </div>

                        <div className="post__body-body">Something Something...</div>

                        <div className="post__response">
                            <div className="response-like">Like</div>
                        </div>
                    </div>
                   
                    
                </div>

                <div className="post__reply">
                    <div className="post__reply-body">
                        No Reply Yet
                    </div>

                    <div className="post__reply-write">
                        <input type="text" placeholder="Write a reply..."/>
                        <button class="btn-reply">write</button>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default ViewPost
