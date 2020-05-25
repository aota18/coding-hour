import React from 'react'
import './ClassMain.css';

function ClassMain() {
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
                        <li className="class__nav__item">Dashboard</li>
                        <li className="class__nav__item">Sessions</li>
                        <li className="class__nav__item">Settings</li>
                    </ul>
                </div>  
            </div>
            <div className="class__body">
                <div className="class__post">

                    <div className="class__post-item">
                        <div className="post-tag">#Notice</div>
                        <div className="post-body">Hello!</div>
                        <div className="post-detail">
                            <div className="post-detail-writer">SANGWON SEO</div>
                            <div className="post-detail-time">a minutes ago</div>
                            <div className="post-detail-comments">34</div>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    )
}

export default ClassMain
