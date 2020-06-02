import React, { Component } from 'react'
import './WantJoin.css';
import profImg from '../../../../../../assets/img/faces/marc.jpg'

export class WantJoin extends Component {
    render() {
        return (
            <div>
                <div className="wantjoin__header">
                    Total : 16 people
                </div>

                <div className="wantjoin__body">
                    <div className="stu__item">
                         <div className="stu__thumbnail">
                            <img src={profImg} alt="IMG"/>
                        </div>
                        <div className="stu__username">Daniel</div>
                        
                        
                    </div>

                    <div className="stu__item">
                         <div className="stu__thumbnail">
                            <img src={profImg} alt="IMG"/>
                        </div>
                        <div className="stu__username">Daniel</div>
                        
                        
                    </div>

                    <div className="stu__item">
                         <div className="stu__thumbnail">
                            <img src={profImg} alt="IMG"/>
                        </div>
                        <div className="stu__username">Daniel</div>
                        
                        
                    </div>
                 
                </div>
            </div>
        )
    }
}

export default WantJoin
