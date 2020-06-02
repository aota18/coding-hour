import React, {Component} from 'react'
import * as postActions from '../../../redux/modules/post';
import * as commentActions from '../../../redux/modules/comment';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import './ViewPost.css';
import profImg from '../../../assets/img/faces/marc.jpg';

export class ViewPost extends Component {

    constructor(props){
        super(props);

        this.state = {
            singlePost: ''
        }
    }

    componentWillMount(){

        this.getPost();
    }


    handleChange = (e) => {
        const { CommentActions } = this.props;
        const { name, value } = e.target;

        CommentActions.changeInput({
            name,
            value,
            form: 'write'
        })
    }

    handleChangeWriteComment = async() => {

    }

    getPost = async() => {
        const postId = this.props.match.params.postId;
        const { PostActions } = this.props;


        try {
            await PostActions.getPostByPostId(postId).then(() => {
                const { singlePost } = this.props.post.toJS();
                
                this.setState({
                    singlePost: singlePost
                })
            })    
        }catch(e) {
            console.log(e);
        }
    }


    getComments(){
        const { user} = this.props;
        const { loggedInfo } = user.toJS();

        const commentList = this.state.singlePost.data.comments.map((comment) => {
            if(loggedInfo.userId == comment.userId){
                return (
                    <div className="reply-body-me">
                                    <div className="reply-text">{comment.text}</div>
                                    <div className="reply-createdAt">{comment.createdAt}</div>
                                </div>
                )
            }else{
                return (
                    <div className="reply-body-other">
                        <div className="reply-thumbnail"><img src={profImg} alt="IMG"/></div>
                        <div className="reply-usernameText">
                            <div className="reply-username">{comment.username}</div>
                            <div className="reply-text">{comment.text}</div>
                        </div>
                        <div className="reply-createdAt">{comment.createdAt}</div>
                    </div>
                )
            }
        });

        return commentList;

    }

    render(){
        const { text }  = this.props.form.toJS();
        const { handleChange, handleChangeWriteComment} = this;
        
        return (
            <div className="container">
                <div className="view__post__container flexwrap">
                    <div className="post__body">
    

                        <div className="post__body-title">#{
                            this.state.singlePost == '' ? '' : this.state.singlePost.data.type
                        }</div>
                        

                        <div className="post__body__content">
                            <div className="post__body-writer">
                                <div className="writer-thumbnail">
                                    <img src={profImg} alt="IMG"/>
                                </div>

                                <div className="writer-about">
                                    <div className="writer-info">
                                        <div className="writer-name">
                                             {this.state.singlePost == '' ? '' : this.state.singlePost.data.writer}
                                       </div>&nbsp;
                                       
                                    </div>
                                    <div className="writer-time">{this.state.singlePost == '' ? '' : this.state.singlePost.data.createdAt}</div>
                                </div>
                                
                            </div>

                            <div className="post__body-body">{this.state.singlePost == '' ? '' : this.state.singlePost.data.body}</div>

                         
                        </div>
                    
                        
                    </div>

                    <div className="post__reply">
                        <div className="post__reply-body">
                            <div className="post__reply-area">
                                {this.state.singlePost == '' ? '' : this.getComments()}
                            </div>
                        </div>

                        <div className="post__reply-write">
                            <input type="text" placeholder="Write a reply..." name="text" value={text} onChange={handleChange}/>
                            <button className="btn-reply" onClick={handleChangeWriteComment}>write</button>
                        </div>
                    </div>

                </div>
                
            </div>
        )
    }
}

export default connect(
    (state) => ({
        classes: state.classes,
        post: state.post,
        user: state.user,
        form: state.comment.getIn(['write', 'form']),
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        CommentActions: bindActionCreators(commentActions, dispatch)
    })
)(ViewPost)


