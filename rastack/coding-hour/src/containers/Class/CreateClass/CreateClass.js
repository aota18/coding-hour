import React, { Component } from 'react'
import './CreateClass.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as classActions from '../../../redux/modules/class';

export class CreateClass extends Component {

    constructor(){
        super();

    }

    handleChange = (e) => {
        const { classActions } = this.props;
        const { name, value } = e.target;
        
        classActions.changeInput({
            name, 
            value,
            form: 'register'
        });
    }

    handleCreateClass = async() => {
        const { form, classActions, history} = this.props;
        const { classname, year, semester, userId, role} = form.toJS();

        try {
            await classActions.createClass({classname, year, semester, userId, role});
        }
        catch(e){
            alert(e);
        }
    }


    render() {
        const { classname, year, semester, role} = this.props.form.toJS();
        const { handleChange } = this;

        return (
            <div className="container">
                <h3>Create Class</h3>
                <div className="create__class__body">
                    <div className="create-name">
                        <label htmlFor="">Class Name</label>
                        <input type="text" placeholder="class name" value={classname} onChange={handleChange}/>
                    </div>

                    

                    <div className="create-year">
                        <label htmlFor="">Year</label>
                        <select name="" id="" value={year} onChange={handleChange}>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                        </select>
                    </div>

                    <div className="create-semester">
                        <label htmlFor="">Semester</label>
                        <select name="" id="" value={semester} onChange={handleChange}>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Fall">Fall</option>
                            <option value="Winter">Winter</option>
                        </select>
                    </div>

                    <div className="create-role">
                        <label htmlFor="">Role</label>
                        <select name="" id="" value={role} onChange={handleChange}>
                            <option value="Professor">Professor</option>
                            <option value="TA">TA</option>
                        </select>
                    </div>
                </div>
                
                <div className="create__class__footer">
                    <button className="btn-done" onClick={handleCreateClass}>Create Class</button>
                </div>
                
            </div>
        )
    }
}

export default CreateClass
