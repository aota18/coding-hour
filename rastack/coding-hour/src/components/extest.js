import React, { Component } from 'react'

 class extest extends Component {
    
    
    
    state = {
        str: " "
    }
    componentDidMount(){
        this.callApi().then(res => {
            this.setState({
            str: res.username
            })
        }).catch(err => console.log(err));
    }

    callApi = async () => {
        const addr = process.env.NODE_ENV == 'production' ? 'http://13.209.70.185' : 'http://localhost'
        let port='3001';
        
        const response = await fetch(`${addr}:${port}/api`);
        const body = await response.json();
        return body;
    }
    render() {
        return (
            <div>
                <p>Hi! {this.state.str}</p>
            </div>
        )
    }
}

export default extest