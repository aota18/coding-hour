import React, { Component } from 'react'
import './Attendance.css';
import profImg from '../../../../../../assets/img/faces/marc.jpg'
export class Attendance extends Component {
    render() {
        return (
            <div>
                 <div className="attendance__header">
                    Total : 16 people
                </div>

                <div className="attendance__body">
                    <div className="stu__item">
                         <div className="stu__thumbnail">
                            <img src={profImg} alt="IMG"/>
                        </div>

                       
                        <div className="stu__username">Daniel</div>
                        <div className="button-area">
                            <button className="btn-attend">Attended</button>
                            <button className="btn-absent">Absent</button>
                        </div>
                        
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

export default Attendance
