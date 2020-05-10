import React, { Component } from 'react'

 class extest extends Component {

    
    state = {
 
        str: " "
    }
    componentDidMount(){
        
        this.callApi().then(res => {
            console.log(res);
            this.setState({
            str: res.username
            })
    }).catch(err=> console.log(err));
    }

    callApi = async ()=> {
       
        const response = await fetch('/api');
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
