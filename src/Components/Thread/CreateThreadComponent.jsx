import React, { Component } from 'react';
import { ThreadService } from '../../Services/ThreadService';
import { SpamService } from '../../Services/SpamService';
import {Checkbox} from 'primereact/checkbox';
import { ForumService } from '../../Services/ForumService';
import { AuthService } from '../../Services/AuthService';


class CreateThreadComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            title: "",
            titleError: "",
            onlyAuth: false,
            spamError: "",
            thread: null
        }

        this.saveThread = this.saveThread.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeOnlyAuthHandler = this.changeOnlyAuthHandler.bind(this);
    }
    componentDidMount(){
        console.log(this.props)
        ForumService.findById(res.forum.id).then(res => {
            if (res.type.length < 3) {
              if (!AuthService.isAuthenticated()) {
                this.props.history.push("/login");
              } else if (!AuthService.getUserData().auth.some(e => e.authority == "ROLE_ADMIN")) {
                if ((!AuthService.getUserData().auth.some(e => e.authority == "ROLE_PLAYER") & res.type.includes("PLAYER")) ||
                  (!AuthService.getUserData().auth.some(e => e.authority == "ROLE_DM") & res.type.includes("DM")) ||
                  (res.type.includes("ADMIN") & res.type.length == 1)){
                  this.props.history.push("/");
                }
              }
            }
        })
        if(this.props.match.params[1]){
            ThreadService.findById(this.props.match.params[1]).then((res)=>{
                this.setState({
                    title:res.title,
                    onlyAuth:res.onlyAuth
                })

            })
        }
    }
    validate = () => {
        let titleError = "";

        if (this.state.title.trim().length === 0) {
            titleError = "You must type something to publish!"
        }
        if (this.state.title.trim().length > 400) {
            titleError = "The title must have less than 400 characters!. This one is " + this.state.title.trim().length 
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

    changeOnlyAuthHandler = () => {
        this.setState({onlyAuth: !this.state.onlyAuth})
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
                    if(this.props.match.params[1]){
                        ThreadService.updateThread(this.props.match.params[1], thread).then(() => {
                            this.props.history.push('/threads/'+this.props.match.params[1] +"/publications");
                        })
                    }else{
                        ThreadService.addThread(thread).then(() => {
                            this.props.history.push('/forums/'+this.props.match.params[0] + "/threads" );
                        })
                    }
                }else{
                    this.setState({spamError:"This form contains spam words! 😠"})
                }
            })
        }
    }

    goback() {
        if(this.props.match.params[1]){
            this.props.history.push("/threads/" + this.props.match.params[1]+ "/publications")
        }else{
            this.props.history.push("/forums/" + this.props.match.params[0] + "/threads")
        }
        
    }

    createForm(){
        return(
            <div className="text-center container">
            <br></br>
            <br></br>
            <form >
            {this.props.match.params[1] != null?
                <h2 className="text-center">Edit Thread</h2>
                :
                <h2 className="text-center">Create Thread</h2>
            }
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

                {this.state.spamError?(<p className="text-danger">{this.state.spamError}</p>):null}
                <div className="row">
                <div className="col">
                    <button className="button5" onClick={() => this.goback()}>Back</button>
                </div>
                <div className="col">
                    {this.props.match.params[1] != null?
                    <button className="button5" variant="outline-success" onClick={this.saveThread}>Edit thread</button>
                         :
                    <button className="button5" variant="outline-success" onClick={this.saveThread}>Create thread</button>
                    }
                </div>
                </div>
            </form>
            </div>
            
        )
    }

    render() {
        return (
            <div >
                {this.createForm()}
            </div>
        );
    }
}

export default CreateThreadComponent;