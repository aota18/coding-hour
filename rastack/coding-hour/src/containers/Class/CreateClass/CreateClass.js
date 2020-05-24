import React, { Component } from 'react'
import ClassSettings from './ClassSettings/ClassSettings';
import RoleSettings from './RoleSettings/RoleSettings';
import DetailSettings from './DetailSettings/DetailSettings';


export class CreateClass extends Component {

    constructor(){
        super();

        this.state= {
            stepIdx: 0
        }
    }

    classSet = <ClassSettings />;
    roleSet = <RoleSettings />;
    detailSet = <DetailSettings />;

    render() {
        return (
            <div className="container">
                {this.classSet}
                {this.roleSet}
                {this.detailSet}
                <br/>
                <button>Back</button>
                <button>Next</button>
                
            </div>
        )
    }
}

export default CreateClass
