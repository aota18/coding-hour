import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import { BsPencil} from 'react-icons/bs';
import { BsXCircle } from 'react-icons/bs';
import { BsFillChatSquareDotsFill } from 'react-icons/bs';
import { CreatePost} from '../../../Post/CreatePost/'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from '../../../../redux/modules/post'
import './Dashboard.css'

import moment from 'moment';

export class Dashboard extends Component{

    constructor(props){
        super(props);
        
     
        this.state = {
            isRendered: false,
            isCreate: false,
            postList: []
        }

        this.openCreate = this.openCreate.bind(this);
        this.afterCreatePost = this.afterCreatePost.bind(this);
    }

    componentWillMount(){
        this.getPosts().then(() => {
            this.setState({
                isRendered:true
            })
        });
    }

    componentDidUpdate(prevProps){
        if(this.props.classId !== prevProps.classId){
            this.getPosts().then(() => {
                this.setState({
                    isRendered: true
                })
            });
        }
        
    }

    getPosts = async() => {
        
        const { PostActions}= this.props;
        const {result} = this.props.classes.toJS();

        await PostActions.getPostByClassId(result.data.clazz._id);
   
        // try{
        //     await PostActions.getPostByClassId(result.data.clazz._id).then(() => {
            
        //     const { posts } = this.props.post.toJS();
            
        //     let postList = posts.data.posts.map((post) =>
            
        //     <Link key={post.postId} to={{ pathname: `/home/post/view/${post.postId}` }}>
        //         <div className="class__post">
        //                 <div className="class__post-item">
        //                     <div className="post-tag">#{post.type}</div>
        //                     <div className="post-body">{post.body}</div>
        //                     <div className="post-detail">
        //                         <div className="post-detail-writer">{post.writer}</div>
        //                         <div className="post-detail-time">{post.createdAt}</div>
        //                         <div className="post-detail-comments">{post.commentCount}</div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </Link>
        //     )

        //     this.setState({
        //         postList: postList
        //     })
        // })

        // }catch(e){
        //     console.log(e);
        // }

    }

    openCreate(){
       
        if(this.state.isCreate){
            this.setState(()=> ({
                isCreate: false
            }))
        }else{
            this.setState(()=> ({
                isCreate: true
            }))
        }
        
    }

    afterCreatePost(){
        this.openCreate();
        this.getPosts();
    }

    createWindow = ()=> {
        if(this.state.isCreate) return <CreatePost handler={this.afterCreatePost}/>
        else return;
    }

    postCancleToggle = ()=> {
        if(!this.state.isCreate) return <BsPencil className="btn-write" size="24" onClick={this.openCreate}/>
        else return <BsXCircle className="btn-write" size="24" onClick={this.openCreate}/>
    }

    render(){

        const { posts } = this.props.post.toJS();

        if(posts.data == undefined)
            return ' ';
            
        const postList = posts.data.posts.map((post) =>
        
        <Link key={post.postId} to={{ pathname: `/home/post/view/${post.postId}` }}>
            <div className="class__post">
                    <div className="class__post-item">
                        <div className="post-tag">#{post.type}</div>
                        <div className="post-body">{post.body}</div>
                        <div className="post-detail">
                            <div className="post-detail-writer">{post.writer}</div>
                            <div className="post-detail-time">{moment(post.createdAt).format('YYYY-MM-DD HH:mm')}</div>
                            <div className="post-detail-comments"><BsFillChatSquareDotsFill/>&nbsp;{post.commentCount}</div>
                        </div>
                    </div>
                </div>
            </Link>
        )
       
        return (
            <div>
                <div className="post__menu">
                    {this.postCancleToggle()}
                </div>
                {this.createWindow()}
                {
                    this.state.isRendered ? 
                    postList==[] ? <div>Create Your First Post!</div> : postList
                    : 'Loading...'
                }
            
                </div>
            
        )
    }

}

export default connect(
    (state) => ({
        classes: state.classes,
        post: state.post,
        user: state.user
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(Dashboard)
