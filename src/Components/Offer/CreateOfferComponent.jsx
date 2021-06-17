import React, { Component } from 'react';
import { OfferService } from '../../Services/OfferService';
import { SpamService } from '../../Services/SpamService';
import Select from "react-select";


class CreateOfferComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            title: "",
            titleError: "",
            description: "",
            descriptionError: "",
            coachingType: "",
            cochingTypeError: "",
            coachingTypeOptions:[{label:"DM",value:"DM"},{label:"PLAYER",value:"PLAYER"}],
            price: "",
            priceError: "",
            selectedOption: "",
            selectedOptionError: "",
            onlyAuth: false,
            spamError: "",
            offer: null
        }

        this.saveOffer = this.saveOffer.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeCoachingTypeHandler = this.changeCoachingTypeHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    }

    validate = () => {
        let titleError = "";
        let priceError = "";
        let selectedOptionError = "";
        let descriptionError = "";

        if (this.state.title.trim().length === 0) {
            titleError = "You must type a title to publish!"
        }
        if (this.state.title.length > 100){
            titleError = "Title must have less than 100 , this one is " + this.state.title.length 
        }

        if (this.state.description.trim().length === 0) {
            descriptionError = "You must type a description to publish!"
        }
        
        if (this.state.price.length === 0) {
            priceError = "Your service needs a price!"
        } else if (this.state.price < 0) {
            priceError = "Price must not be negative!"
        } else if (this.state.price.split('.').length == 2 && this.state.price.split('.')[1].length > 2) {
            priceError = "Price must not have more than 2 decimals!"
        } else if (this.state.price.split('.')[0].length > 3) {
            priceError = "Price must be lower than 1000$"
        }

        if(this.state.selectedOption==null || this.state.selectedOption.length==0){
            selectedOptionError="You must select at least one rol"
        }

        this.setState({ titleError });
        this.setState({ selectedOptionError });
        this.setState({ priceError });
        this.setState({ descriptionError });
        if (titleError || selectedOptionError || priceError || descriptionError) {
            return false;
        } else {
            return true;
        }

    }
    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    changePriceHandler = (event) => {
        this.setState({ price: event.target.value })
    }

    changeDescriptionHandler = (event) => {
        this.setState({ description: event.target.value })
    }

    changeCoachingTypeHandler = selectedOption => {
        this.setState({ selectedOption })
        this.setState({ coachingType: selectedOption.value })
    }

    saveOffer = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let offer = {
                title: this.state.title.trim(), description: this.state.description.trim(), coachingType: this.state.coachingType, price: this.state.price, creator: null
            }
            
            SpamService.checkOffer(offer).then((data)=>{
                if(data === false){
                    OfferService.addOffer(offer).then((res) => {
                        alert(res.data)
                        this.props.history.push('/coaching');
                    })
                }else{
                    this.setState({spamError:"This form contains spam words! 😠"})
                }
            })
        }
    }

    createForm(){
        return(
            <React.Fragment>
            <br></br>
            <br></br>
            <form >
                <h2 className="text-center">Create Offer</h2>
                <p>* You can only have 2 coaching offers published at the same time * </p>
                    <div className="form-group">
                        <label>Title: </label>
                        <textarea placeholder="Title" name="title" type="text-box" className="form-control"
                            value={this.state.title} onChange={this.changeTitleHandler}></textarea>

                        {this.state.titleError ? (<div className="ValidatorMessage">{this.state.titleError}</div>) : null}
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <textarea placeholder="Description" name="description" type="text-box" className="form-control"
                            value={this.state.description} onChange={this.changeDescriptionHandler}></textarea>

                        {this.state.descriptionError ? (<div className="ValidatorMessage">{this.state.descriptionError}</div>) : null}
                    </div>

                    <div className="form-group">
                        <label >Rol</label>
                            <Select  options={this.state.coachingTypeOptions} value={this.state.selectedOption} onChange={this.changeCoachingTypeHandler} className="basic-multi-select" closeMenuOnSelect={true} />
                            {this.state.selectedOptionError ? (<div className="ValidatorMessage">{this.state.selectedOptionError}</div>) : null}
                    </div>

                    <div className="form-group">
                        <label >Price</label>
                        <input placeholder="Price" name="price" className="FormInput" type="number" min="0" step="0.01"
                                value={this.state.price} onChange={this.changePriceHandler} />
                        {this.state.priceError ? (<div className="ValidatorMessage">{this.state.priceError}</div>) : null}
                    </div>

                    <button className="button5" variant="outline-success" onClick={this.saveOffer}>Create offer</button>
                    <button className="button5" style={{float:"right"}} onClick={() => this.goback()}>Back</button>
                {this.state.spamError?(<p className="text-danger">{this.state.spamError}</p>):null}
            </form>
            </React.Fragment>
        )
    }

    goback() {
        this.props.history.push("/coaching")  
    }

    render() {
        return (
            <div>
                {this.createForm()}
            </div>
        );
    }
}

export default CreateOfferComponent;