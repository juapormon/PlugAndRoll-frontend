import React, { Component } from 'react';
import initialImage from '../assets/Lost-mines-of-phandelver-dungeons-and-dragons-5E.jpg';

class HomeComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            
        }
    }
    render() {
        return (
            <div>

            <img src={initialImage}  width="100%"/>

            </div>
        );
    }
}

export default HomeComponent;