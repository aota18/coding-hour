import React, {Component}from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from '../../../redux/modules/post';

import './CreatePost.css'
export class CreatePost extends Component {


  
    handleChange = (e) => {
        const { PostActions } = this.props;
        const { name, value } = e.target;
        
        PostActions.changeInput({
            name, 
            value,
            form: 'create'
        });
    }

    handleCreatePost = async() => {
        const {form, PostActions, history, user, classes} = this.props;
        const { title, body} = form.toJS();
        const {loggedInfo} = user.toJS();
        const {result} = classes.toJS();
        try{
            const completeForm = {
                title,
                body,
                userId: loggedInfo.userId,
                classId: result.data.clazz._id,
                type: 'Notice'
            }
          
            await PostActions.createPost(completeForm);

        }catch(e) {
            console.log(e)
        }
    }

    componentWillUnmount() {
        const { PostActions } = this.props;
        PostActions.initializeForm('create')
    }


    render(){

        const { title, body}  = this.props.form.toJS();
        const { handleChange, handleCreatePost } = this;

    return (
        <div className="class__post-item">
            <div className="create__post__header">
                <div className="header_title">
                    <label htmlFor="">Title</label>
                    <input type="text" name="title" value={title} onChange={handleChange}/>
                </div>
            </div>

            <div className="create__post__body">
                <textarea cols="30" rows="10" placeholder="Write Something..." name="body" value={body} onChange={handleChange}/>

            </div>

            <div className="create__post__footer">
                <div className="post_submit" onClick={handleCreatePost}>Done</div>
            </div>
        </div>
    )
    }
}

export default connect(
    (state) => ({
        form: state.post.getIn(['create', 'form']),
        result: state.post.get('result'),
        classes: state.classes,
        user: state.user
    }),
    (dispatch) => ({
        PostActions : bindActionCreators(postActions, dispatch)
    }) 
)(CreatePost)
