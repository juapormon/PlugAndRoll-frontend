import React, { Component } from "react";
import { PruebaService } from "../../Services/PruebaService";

class PruebaComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            pruebas: []
        }
        this.showPruebas = this.showPruebas.bind(this);
    }

    
    componentDidMount(){
        PruebaService.findAll().then(data => 
            this.setState({pruebas: data.data}));
        console.log(this.state.pruebas)
    }

    showPruebas(){
        return (
            <div>{this.state.pruebas.map((prueba) => {return (prueba.image+", ")})}</div>
        )
    }
    render(){
        return (
            <div>
                <br />
                <br />
                {this.showPruebas()}
            </div>
        )
    }
}

export default PruebaComponent;