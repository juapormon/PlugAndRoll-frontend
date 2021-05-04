import React, { Component } from 'react';
import cajaroja from '../assets/cajaroja.jpg';

class HomeComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            
        }
    }
    render() {
        return (
            <div>

            <img src={cajaroja}  width="400" height="800"/>

            </div>
        );
    }
}

export default HomeComponent;