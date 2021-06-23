import React, { Component } from 'react';
import cajaroja from '../assets/lostMineOfPhandelver.jpeg';

class HomeComponent extends Component {

    constructor(props){
        super(props)

        this.state={
            
        }
    }
    render() {
        return (
            <div class="has-bg-img">
                <img class="bg-img" src={cajaroja} alt="Card image" width="100%"/>
            </div>
        );
    }
}

export default HomeComponent;