import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import { BsPencil} from 'react-icons/bs';
import { BsXCircle } from 'react-icons/bs';
import { CreatePost} from '../../../Post/CreatePost/'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from '../../../../redux/modules/post'
import './Dashboard.css'

export class Dashboard extends Component{

    constructor(props){
        super(props);
        
     
        this.state = {
            isRendered: false,
            isCreate: false,
            postList: []
        }

        this.openCreate = this.openCreate.bind(this);
        this.afterCreatePost = this.afterCreatePost(this);
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
        
        const { PostActions, post}= this.props;
        const {result} = this.props.classes.toJS();
   
        try{
            await PostActions.getPostByClassId(result.data.clazz._id).then(() => {
            
            const { posts } = this.props.post.toJS();
            
            let postList = posts.data.posts.map((post) =>
            
            <Link key={post.postId} to={{ pathname: `/home/post/view/${post.postId}` }}>
                <div className="class__post">
                        <div className="class__post-item">
                            <div className="post-tag">#{post.type}</div>
                            <div className="post-body">{post.body}</div>
                            <div className="post-detail">
                                <div className="post-detail-writer">{post.writer}</div>
                                <div className="post-detail-time">{post.createdAt}</div>
                                <div className="post-detail-comments">{post.commentCount}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            )

            this.setState({
                postList: postList
            })
        })

        }catch(e){
            console.log(e);
        }

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
       
        return (
            <div>
                <div className="post__menu">
                    {this.postCancleToggle()}
                </div>
                {this.createWindow()}
                {
                    this.state.isRendered ? 
                    this.state.postList==[] ? <div>Create Your First Post!</div> : this.state.postList
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
