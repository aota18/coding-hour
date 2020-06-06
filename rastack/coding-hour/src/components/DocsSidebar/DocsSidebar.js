import React, { Component } from 'react'
import './DocsSidebar.css';

export class DocsSidebar extends Component {
    render() {
        return (
            <div className="Docs__SideContainer">
                <div className="Docs__listContainer">
                    <ul className="Docs__MenuList">
                        <li key="introduction" className="Docs__listHeader" >
                            <a className="docs-link" href='#introduction'>Introduction</a>
                        </li>
                        <li key="coding-hour" className="Docs__listItem" >
                            <a className="docs-link" href='#coding-hour'>Coding Hour</a>
                        </li>
                  
                        
                        <li key="getting-started" className="Docs__listHeader" >
                            <a className="docs-link" href='#getting-started'>Getting Started</a>
                        </li>

                        <li key="setup" className="Docs__listItem" >
                            <a className="docs-link" href='#setup'>Setup</a>
                        </li>

                        <li key="how-to-deploy" className="Docs__listItem" >
                            <a className="docs-link" href='#how-to-deploy'>How to Deploy</a>
                        </li>
                        <li key="setup-agile-process-env" className="Docs__listItem" >
                            <a className="docs-link" href='#setup-agile-process-env'>Setup Agile Process Env</a>
                        </li>

                        <li key="join" className="Docs__listHeader" >
                            <a className="docs-link" href='#about-us'> About Us</a>
                        </li>

                        

                        <li key="create" className="Docs__listHeader" >
                            
                        </li>
                    </ul>
                </div>
        </div>
        )
    }
}

export default DocsSidebar
