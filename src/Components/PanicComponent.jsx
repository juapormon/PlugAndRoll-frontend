import React, { Component } from 'react';
import dragon from '../assets/dragon.png';

class PanicComponent extends Component {

    constructor(props){
        super(props)
        this.state={
            error:""
        }
    }
    render() {
        return (
            <div className="text-center">
                <br/>
                <h1 >Ups!</h1>
                <p ><img  src={dragon} width="10%" height="10%"/></p>
                <h5 >We're still developing</h5>
                <p > Try a few minutes later or contact the support service </p>
            </div>
        );
    }
}

export default PanicComponent;