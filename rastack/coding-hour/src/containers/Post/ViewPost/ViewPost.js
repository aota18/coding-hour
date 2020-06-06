import React, {Component} from 'react'
import * as postActions from '../../../redux/modules/post';
import * as commentActions from '../../../redux/modules/comment';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

import './ViewPost.css';
import profImg from '../../../assets/img/faces/marc.jpg';
import { animateScroll } from 'react-scroll';

export class ViewPost extends Component {

    constructor(props){
        super(props);

        this.state = {
            singlePost: ''
        }

        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    componentWillMount(){
        
        this.getPost().then(() => {
            this.scrollToBottom();
        })
    }

    componentDidUpdate(){
        this.scrollToBottom();
    }

    scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: 'comment'
        })
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

    handleWriteComment = async() => {
        const {CommentActions, form, user, post} = this.props;
        const { text } = form.toJS();
        const { loggedInfo } = user.toJS();
        const { singlePost } = post.toJS();

        try{
            const completeForm = {
                text, 
                userId: loggedInfo.userId,
                postId: singlePost.data.postId,
            }

            await CommentActions.writeComment(completeForm)
            .then(() => {
                // console.log(this.props)
                this.getPost()
                CommentActions.initializeForm('write')

            })
        }
        catch(e){
            console.log(e)
        }
    }

    componentWillUnmount(){
        const { CommentActions } = this.props;
        CommentActions.initializeForm('write')
    }

    getPost = async() => {
        const postId = this.props.match.params.postId;
        const { PostActions, ClassActions } = this.props;
        //const classId = this.props.match.params.classId;

        try {
            
            await PostActions.getPostByPostId(postId).then(() => {
                const { singlePost } = this.props.post.toJS();
                
                this.setState({
                    singlePost: singlePost,
                })
            })    
        }catch(e) {
            console.log(e);
        }
    }


    getComments(){
        const { user} = this.props;
        const { loggedInfo } = user.toJS();
        let kIdx = 0;

        const commentList = this.state.singlePost.data.comments.map((comment, idx) => {

            if(loggedInfo.userId == comment.userId){
                return (
                    <div className="reply-body-me" key={kIdx++} 
                            id={idx == this.state.singlePost.data.comments.length-1 ? 'lastComment' : ' '}>
                        <div className="reply-text">{comment.text}</div>
                        <div className="reply-createdAt">{moment(comment.createdAt).format('YYYY-MM-DD HH:mm')}</div>
                    </div>
                )
            } else {
                return (
                    <div className="reply-body-other" key={kIdx++}
                            id={idx == this.state.singlePost.data.comments.length-1 ? 'lastComment' : ' '}>
                        <div className="reply-thumbnail"><img src={profImg} alt="IMG"/></div>
                        <div className="reply-usernameText">
                            <div className="reply-username">{comment.username}</div>
                            <div className="reply-text">{comment.text}</div>
                        </div>
                        <div className="reply-createdAt">{moment(comment.createdAt).format('YYYY-MM-DD HH:mm')}</div>
                    </div>
                )
            }
        });

        return commentList;

    }


    render(){
        const { text }  = this.props.form.toJS();
        const { handleChange, handleWriteComment} = this;


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
                                    <div className="writer-time">{this.state.singlePost == '' ? '' : moment(this.state.singlePost.data.createdAt).format('YYYY-MM-DD HH:mm')}</div>
                                </div>
                                
                            </div>

                            <div className="post__body-body">{this.state.singlePost == '' ? '' : this.state.singlePost.data.body}</div>

                         
                        </div>
                    
                        
                    </div>

                    <div className="post__reply">
                        <div id="comment" className="post__reply-body">
                            <div className="post__reply-area" id="replyArea">
                                {this.state.singlePost == '' ? '' : this.getComments()}
                            </div>
                        </div>

                        <div className="post__reply-write">
                            <input type="text" placeholder="Write a reply..." name="text" value={text} onChange={handleChange}/>
                            <button className="btn-reply" onClick={handleWriteComment}>write</button>
                        </div>
                    </div>

                </div>
                
            </div>
            

        )
        var objDiv = document.getElementById("comment"); 
        objDiv.scrollTop = objDiv.scrollHeight;
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


