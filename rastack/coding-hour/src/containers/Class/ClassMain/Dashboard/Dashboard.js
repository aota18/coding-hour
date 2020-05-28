import React, {Component} from 'react'
import { BsPencil} from 'react-icons/bs';
import { BsXCircle } from 'react-icons/bs';
import { CreatePost} from '../../../Post/CreatePost/CreatePost'
import './Dashboard.css'

export class Dashboard extends Component{

    constructor(props){
        super(props);

        this.state = {
            isCreate: false
        }

        this.openCreate = this.openCreate.bind(this);
    }

    openCreate(){
        console.log("Start to Write")
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

    createWindow = ()=> {
        if(this.state.isCreate) return <CreatePost />
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
                <div className="class__post">
                        <div className="class__post-item">
                            <div className="post-tag">#Notice</div>
                            <div className="post-body">Hello!</div>
                            <div className="post-detail">
                                <div className="post-detail-writer">SANGWON SEO</div>
                                <div className="post-detail-time">a minutes ago</div>
                                <div className="post-detail-comments">34</div>
                            </div>
                        </div>
                    </div>

                    <div className="class__post">
                        <div className="class__post-item">
                            <div className="post-tag">#Notice</div>
                            <div className="post-body">Hello!</div>
                            <div className="post-detail">
                                <div className="post-detail-writer">SANGWON SEO</div>
                                <div className="post-detail-time">a minutes ago</div>
                                <div className="post-detail-comments">34</div>
                            </div>
                        </div>
                    </div>

                    <div className="class__post">
                        <div className="class__post-item">
                            <div className="post-tag">#Notice</div>
                            <div className="post-body">Hello!</div>
                            <div className="post-detail">
                                <div className="post-detail-writer">SANGWON SEO</div>
                                <div className="post-detail-time">a minutes ago</div>
                                <div className="post-detail-comments">34</div>
                            </div>
                        </div>
                    </div>
            
                </div>
            
        )
    }

}

export default Dashboard
