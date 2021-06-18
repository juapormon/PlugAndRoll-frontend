import React, { Component } from 'react';
import { ThreadService } from '../../Services/ThreadService';
import { SpamService } from '../../Services/SpamService';
import {Checkbox} from 'primereact/checkbox';
import { ForumService } from '../../Services/ForumService';
import { AuthService } from '../../Services/AuthService';
import { ApplicationService } from '../../Services/ApplicationService';


class CreateApplicationComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            date: "",
            dateError: "",
            onlyAuth: false,
            application: null
        }

        this.saveApplication = this.saveApplication.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
    }

    changeDateHandler = (event) => {
        this.setState({ date: event.target.value });
    }

    validate = () => {
        let dateError = "";

        if (this.state.date.length === 0) {
            dateError = "Date cannot be empty";
        }        

        if (this.state.date.split('-')[0] < new Date().getFullYear()) {
            dateError = "Date must be in the future!";
        }else{
            if (this.state.date.split('-')[0] == new Date().getFullYear()) {
                if(this.state.date.split('-')[1] <  new Date().getMonth()+1){
                    dateError = "Date must be in the future!";
                }else{
                    if(this.state.date.split('-')[1] == new Date().getMonth()+1){
                        if (this.state.date.split('-')[2] <= new Date().getDate()) {
                            dateError = "Date must be in the future!";
                        }
                    }
                }        
            }
        }
             
        this.setState({ dateError });
        if (dateError) {
            return false;
        } else {
            return true;
        }

    }

    saveApplication = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let application = {
                applicationUsername: null, coachingOffer: null, date: this.state.date, accepted: null
            }
            ApplicationService.applyToOffer(this.props.match.params[0], application).then((res) => {
                alert(res)
                this.props.history.push('/coaching');
            })
        }
    }

    goback(){
        this.props.history.push("/coaching")
    }

    createForm(){
        return(
            <React.Fragment>
            <br/>
            <br/>
            <form >
                
                    <div className="form-group">
                    <h2>Apply to offer</h2>
                    <br/>
                    <br/>
                        <label >Date:</label>
                    <input type="date" className="FormInput" value={this.state.date} onChange={this.changeDateHandler}/>
                    {this.state.dateError ? (<div className="ValidatorMessage">
                    {this.state.dateError}
                    </div>) : null}
                    <br/>
                    <br/>
                    <br/>
                    <div className="row">
                        <div className="col">
                        <button className="button5 btn-lg"  variant="outline-success" onClick={() => this.goback()}>Back</button>
                        </div>
                        <div className="col">
                        <button className="button4 btn-lg" variant="outline-success" onClick={this.saveApplication}>Apply</button>
                        </div>
                    </div>
                    </div>
                    </form>
            </React.Fragment>
        )
    }

    render() {
        return (
            
            <div className="text-center container">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
                {AuthService.isAuthenticated()?
                this.createForm()
                :null
                }

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            </div>
        );
    }
}

export default CreateApplicationComponent;