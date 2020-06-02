import React, { Component } from 'react'
import './CreateClass.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as classActions from '../../../redux/modules/classes';
import storage from '../../../lib/storage';

 class CreateClass extends Component {
    

    constructor (props) {
        super(props);
    }
    componentWillUnmount() {
        const { ClassActions } = this.props;
        ClassActions.initializeForm('register')
    }

    handleChange = (e) => {
        const { ClassActions } = this.props;
        const { name, value } = e.target;
        
        ClassActions.changeInput({
            name, 
            value,
            form: 'register'
        });
    }



    handleCreateClass = async() => {
        const { form, ClassActions, history, user } = this.props;
        const { classname, year, semester, role} = form.toJS();
        const { loggedInfo } =this.props.user.toJS();
        const { userId } = loggedInfo
       
        try {
            await ClassActions.createClass({classname, userId, year, semester, role});
            alert('Created Class Successfully!')
            history.push('/home')
        }
        catch(e){
            alert(e);
        }
    }


    render() {
       
        const { classname, year, semester, role} = this.props.form.toJS();
        const { handleChange, handleCreateClass } = this;

        return (
            <div className="container">
                <h3>Create Class</h3>
                <div className="create__class__body">
                    <div className="create-name">
                        <label htmlFor="">Class Name</label>
                        <input type="text" placeholder="class name" value={classname} onChange={handleChange} name="classname"/>
                    </div>

                    

                    <div className="create-year">
                        <label htmlFor="">Year</label>
                        <select name="" id="" value={year} onChange={handleChange} name="year">
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                        </select>
                    </div>

                    <div className="create-semester">
                        <label htmlFor="">Semester</label>
                        <select name="" id="" value={semester} onChange={handleChange} name="semester">
                            <option value="1">Spring</option>
                            <option value="3">Summer</option>
                            <option value="2">Fall</option>
                            <option value="4">Winter</option>
                        </select>
                    </div>

                    <div className="create-role">
                        <label htmlFor="">Role</label>
                        <select name="" id="" value={role} onChange={handleChange} name="role">
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


export default connect (
    (state) => ({
        form: state.classes.getIn(['register', 'form']),
        result: state.auth.get('result'),
        user: state.user
    }),
    (dispatch) => ({
        ClassActions: bindActionCreators(classActions, dispatch)

    })
)(CreateClass);