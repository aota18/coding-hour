import React from 'react'
import './Main.css';


const Main = ({children}) => {
    return (
        <div className="MainContainer">
            {children}
        </div>
    )
}

export default Main
