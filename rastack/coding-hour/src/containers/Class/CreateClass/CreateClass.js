import React, { Component } from 'react'
import './CreateClass.css'
export class CreateClass extends Component {

    constructor(){
        super();

        this.state= {
            stepIdx: 0
        }
    }


    render() {
        return (
            <div className="container">
                <h3>Create Class</h3>
                <div className="create__class__body">
                    <div className="create-name">
                        <label htmlFor="">Class Name</label>
                        <input type="text" placeholder="class name"/>
                    </div>

                    

                    <div className="create-year">
                        <label htmlFor="">Year</label>
                        <select name="" id="">
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                        </select>
                    </div>

                    <div className="create-semester">
                        <label htmlFor="">Semester</label>
                        <select name="" id="">
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                        </select>
                    </div>

                    <div className="create-role">
                        <label htmlFor="">Role</label>
                        <select name="" id="">
                            <option value="Professor">Professor</option>
                            <option value="TA">TA</option>
                        </select>
                    </div>
                </div>
                
                <div className="create__class__footer">
                    <button className="btn-done">Create Class</button>
                </div>
                
            </div>
        )
    }
}

export default CreateClass
