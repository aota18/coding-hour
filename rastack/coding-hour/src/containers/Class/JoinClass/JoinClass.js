import React, { Component } from 'react'
import * as classActions from '../../../redux/modules/classes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './JoinClass.css';
export class JoinClass extends Component {


    constructor(){
        super();
        this.state = {
            classList: [],
            isShow: false
        }

        this.selectClass = this.selectClass.bind(this);
    }

    handleChange = async (e) => {
        
        // Get Action
        const { ClassActions } = this.props;
        const { name, value } = e.target;

        ClassActions.changeInput({
            name, 
            value,
            form: 'join'
        });
        
        if(e.target.value){
            
            try {
                const userInput = e.target.value
                await ClassActions.classByName(userInput === ' ' ? 'e' : userInput);
                const result = this.props.queryResult.toJS();
                
                this.setState({
                    isShow: true,
                    classList: result.data.classes
                })
                
            }
            catch(e){
               
            }
        }

        this.showClassList();
       
    }

    showClassList(){
        const classItems = this.state.classList.map((cl) => 
            <li key={cl._id} onClick={() => this.selectClass(cl.name, cl._id)}>{cl.name}</li>
        )

        if(this.state.classList.length){
            return (
                <div className="autoComplete">
                    <ul>
                        {classItems}
                    </ul>
                </div>
            )
        }
    }

    selectClass(val, classId){
        const { form, ClassActions, history} = this.props;

        ClassActions.changeInput({
            name : 'name',
            value : val,
            form: 'join'
        });

        ClassActions.changeInput({
            name: 'classId',
            value: classId,
            form: 'join'
        })

        this.setState({
            isShow: false
        })
    }


    
        
    

    handleJoinClass = async() => {
        const { form, ClassActions, history} = this.props;
        const { classId } = form.toJS();
        const { loggedInfo } =this.props.user.toJS();
        const { userId } = loggedInfo

        try {
            await ClassActions.joinClass({classId, userId});
            alert('Joined to Class Successfully!')
        }
        catch(e){
            alert(e);
        }

    }



    render() {
        
        const { handleChange, handleJoinClass } = this;
        const { name } = this.props.form.toJS();
       // const { name } = this.props.forms.toJS();

        return (
            <div className="container">
                <h3>Join Class</h3>

                <div className="join__class__body">
                    <input type="text=" autoComplete="name" placeholder="Enter Class Code" name="name" value={name} onChange={handleChange}></input>
                    
                    {this.state.isShow ? this.showClassList() : <div></div>}
                </div>
                
                <div className="join__class__footer">
                    <button className="btn-done" onClick={handleJoinClass}>Join</button>
                </div>
                
            </div>
        )
    }
}

export default connect (
    (state) => ({
        form: state.classes.getIn(['join', 'form']),
        result: state.classes.get('result'),
        queryResult: state.classes.get('queryResult'),
        user: state.user
    }),
    (dispatch) => ({
        ClassActions: bindActionCreators(classActions, dispatch)
    })
)(JoinClass)

