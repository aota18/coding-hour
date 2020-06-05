import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './Docs.css'
import DocsSidebar from '../components/DocsSidebar/DocsSidebar';
import ScrollableAnchor from 'react-scrollable-anchor';
import profImg from '../assets/img/faces/marc.jpg'; 

import skj from '../assets/img/creators/skj.jpg';
import ywj from '../assets/img/creators/ywj.jpg'; 
import sws from '../assets/img/creators/sws.jpg';
import hck from '../assets/img/creators/hck.jpg';
import wsj from '../assets/img/creators/wsj.jpg';

export class Docs extends Component {


    render() {
        
        return (
            <div className="DocsContainer">
                <DocsSidebar></DocsSidebar>
                <div className="doc__body">
                <ScrollableAnchor id={'introduction'}>
                    <div className="doc__header">
                        Introduction
                    </div>
                </ScrollableAnchor>

                <ScrollableAnchor id={'coding-hour'}>
                    <div className="doc__h2">
                        Coding Hour
                    </div>
                </ScrollableAnchor>
                    <p>
                        Coding Hour is a class session helps students who need some help from the class they are taking. 
                        Our service is a plaftorm which provides the space where the tutor and tutee can communicate and some 
                        features to help the administrator of the class manage their class.
                    </p>

                    <ScrollableAnchor id={'getting-started'}>
                    <div className="doc__header">
                        Getting Started
                    </div>
                    </ScrollableAnchor>

                    <ScrollableAnchor id={'setup'}>
                    <div className="doc__h2">
                        Setup
                    </div>
                    </ScrollableAnchor>
                    <p>
                        Let's Get started with intsalling dev enviorment! <br/><br/>
                        First, You can clone our source code from <a href="https://github.com/aota18/coding-hour">Github</a>.

                        <div className="doc__code">
                            $ git clone &lt; git-url &gt;
                        </div>
                    </p>

                    <p>
                        After the cloning, now you can see the internal file structure of our project.
                    <div className="doc__code">
                        [File Structure] <br/><br/>
                           coding-hour/<br/>
                           |<br/>
                           |----- kostack/<br/>
                           |----- rastack/<br/>
                           |----- docker-compose.yml<br/>
                           |----- docker-push.sh<br/>
                           |....<br/>
                        </div>
                    </p>

                    <p>
                        <ul>
                            <li>kostack : Server (NodeJS) Folder </li>
                            <li>rastack : Client (ReactJS) Folder </li>
                            <li>docker-compose.yml : Docker Configuration File </li>
                            <li>docker-push.sh : Bash Script for automated deploy </li>
                        </ul>
                    </p>
                    <br></br>
                    <p>
                        Next, You have to run the server and client program.
                        <br/><br/>
                        In <b>kostack</b> folder,

                        <div className="doc__code">
                            $ yarn start:dev
                        </div>

                        After this command, the server program will run in address <a href="http://localhost:3001">localhost:3001</a>.<br/>
                    </p>

                    <p>
                    
                        Next, In <b>rastack/coding-hour</b> folder,

                        <div className="doc__code">
                            $ npm install
                        </div>

                        After this command, the client program will run in address <a href="http://localhost:3000">localhost:3000</a>.<br/>
                    </p>

                    <ScrollableAnchor id={'how-to-deploy'}>
                    <div className="doc__h2">
                        How to Deploy
                    </div>
                    </ScrollableAnchor>
                    <p>
                    After you update your application, you have to deploy your application to the server All you have to do is just execute one bash file : <b>docker-push.sh</b>.
                    
                    <div className="doc__code">
                        $ ./docker-push.sh
                    </div>
                    </p>

                    <br/>
                    <p>
                        Congratulations! Now You've deployed your application to AWS Server! Isn't it amazing?!
                    </p>
                    
                    <ScrollableAnchor id={'about-us'}>
                        <div className="doc__header">
                            About Us
                        </div>
                    </ScrollableAnchor>

                    <div className="doc__about">
                        <div className="profile">
                            <img src = {sws}/>
                            <div className="profile__name">
                                Sangwon Seo
                            </div>
                            <div className="profile__role">
                                Developer
                            </div>
                        </div>

                        <div className="profile">
                            <img src = {wsj}/>
                            <div className="profile__name">
                                Wonsik Jung
                            </div>
                            <div className="profile__role">
                                Developer
                            </div>
                        </div>

                        <div className="profile">
                            <img src = {skj}/>
                            <div className="profile__name">
                                Sangkyu Jeon
                            </div>
                            <div className="profile__role">
                                Developer
                            </div>
                        </div>

                        <div className="profile">
                            <img src = {hck}/>
                            <div className="profile__name">
                                Heechan Kim
                            </div>
                            <div className="profile__role">
                                Developer
                            </div>
                        </div>

                        <div className="profile">
                            <img src = {ywj}/>
                            <div className="profile__name">
                                Youngwon Jeon
                            </div>
                            <div className="profile__role">
                                Developer
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        )
    }
}

export default Docs
