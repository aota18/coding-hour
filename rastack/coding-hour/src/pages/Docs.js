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
                    
                    <ScrollableAnchor id={'setup-agile-process-env'}>
                    <div className="doc__h2">
                        Setup Agile Process Env
                    </div>
                    </ScrollableAnchor>

                    <h2>Overview</h2>
                    <p><img src="image-20200520132854862.png" alt="image-20200520132854862" style="zoom:50%;" /></p>
                    <ul>
                    <li>For the automation system, we used <code>hooks</code> to create an environment where test and build are automatically executed at the point of commit and push. </li>
                    <li>In order to speed up development process and problems of Multi-platform development environment, the results of test and build were notified to all personnel through the Telegram. </li>
                    <li>As shown in the figure above, Jest was used for unit test when commits are done and when pushing, the docker transmitts image to the server through the docker.</li>

                    </ul>
                    <h2>Setup</h2>
                    <ul>
                    <li>In order to build our agile process environment, you need to follow following step.</li>

                    </ul>
                    <ol start='' >
                    <li><p>Create <code>.git/hooks</code> folder in your repository.</p>
                    <ul>
                    <li><code>.git</code> folder is hidden at top directory of your repository</li>

                    </ul>
                    </li>
                    <li><p>Copy and past <code>pre-commit</code> and <code>pre-push</code> script to <code>.git/hooks</code></p>
                    <ul>
                    <li><code>pre-commit</code> and <code>pre-push</code> scripts are shown below.</li>
                    <li>Make sure that <code>pre-commit</code> and <code>pre-push</code> files are executable. (In case it&#39;s not excutable, use <code>chmod</code> command to change authority.)</li>

                    </ul>
                    </li>
                    <li><p>Install Jest</p>
                    <pre><code>npm install --save-dev jest
                    </code></pre>
                    </li>
                    <li><p>Now let&#39;s commit or push to see our enviroment is working!</p>
                    </li>

                    </ol>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <ul>
                    <li><p>If you want to build our project through push, consider following guideline. Other wise, there might be failure while pushing.</p>
                    <ul>
                    <li>Before build, please connect to our server with <code>ssh</code> first. </li>
                    <li>Your last commit message must include a word &quot;#777&quot;</li>
                    <li>You need to have docker account which is granted by our docker system.</li>

                    </ul>
                    </li>

                    </ul>




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
