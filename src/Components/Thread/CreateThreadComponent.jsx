import React, { Component } from 'react';
import { ThreadService } from '../../Services/ThreadService';
import { SpamService } from '../../Services/SpamService';
import {Checkbox} from 'primereact/checkbox';
import { ForumService } from '../../Services/ForumService';


class CreateThreadComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            title: "",
            titleError: "",
            onlyAuth: false,
            spamError: "",
        }

        this.saveThread = this.saveThread.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeOnlyAuthHandler = this.changeOnlyAuthHandler.bind(this);
    }
    validate = () => {
        let titleError = "";

        if (this.state.title.trim().length === 0) {
            titleError = "You must type something to publish!"
        }

        this.setState({ titleError });
        if (titleError) {
            return false;
        } else {
            return true;
        }

    }
    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    changeOnlyAuthHandler = (event) => {
        if(event.target.value == "on"){
            this.setState({ onlyAuth: true});
        }else{
            this.setState({ onlyAuth: false});
        }
    }

    saveThread = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state.onlyAuth)
            let thread = {
                title: this.state.title.trim(), rating: null, openDate:null, closeDate:null, creator: null,
                 onlyAuth: this.state.onlyAuth, forumId: this.props.match.params[0] 
            }
            let threadDTO = { title: thread.title }
            
            SpamService.checkThread(threadDTO).then((data)=>{
                if(data === false){
                    ThreadService.addThread(thread).then(() => {
                        this.props.history.push('/forums/'+this.props.match.params[0] + "/threads" );
                    })
                }else{
                    this.setState({spamError:"This form contains spam words! 😠"})
                }
            })
        }
    }

    render() {
        return (
            <div>

                <br></br>
                <br></br>
                <form >
                    <h2 className="text-center">Create Thread</h2>
                        <div className="form-group">
                            <label>Title: </label>
                            <textarea placeholder="Title" name="title" type="text-box" className="form-control"
                                value={this.state.title} onChange={this.changeTitleHandler}></textarea>

                            {this.state.titleError ? (<div className="ValidatorMessage">{this.state.titleError}</div>) : null}
                        </div>
                        <div className="form-group">
                        <label>
                            Private Thread?
                        <input
                            name="onlyAuth"
                            type="checkbox"
                            checked={this.state.onlyAuth}
                            onChange={this.changeOnlyAuthHandler} />
                        </label>
                        </div>
                    <button className="button5" variant="outline-success" onClick={this.saveThread}>Create thread</button>
                    {this.state.spamError?(<p className="text-danger">{this.state.spamError}</p>):null}
                </form>
            </div>
        );
    }
}

export default CreateThreadComponent;