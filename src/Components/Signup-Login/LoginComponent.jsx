import React, { Component } from "react";
import { AuthService } from "../../Services/AuthService";
import { UserService } from '../../Services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            usernameError: "",
            password: "",
            passwordError: "",
            submitError: "",
        }

        this.loginUser = this.loginUser.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    }

    componentDidMount() {
        if (AuthService.isAuthenticated()) {
            this.props.history.push('/')
        }
    }

    validate = () => {
        let usernameError = "";
        let passwordError = "";

        if (this.state.username.length === 0) {
            usernameError = "Username cannot be empty";
        }
        if (this.state.password.length === 0) {
            passwordError = "Password cannot be empty";
        }
        if (this.state.password.length < 8) {
            passwordError = "Password must have at least 8 characters";
        }

        this.setState({ usernameError });
        this.setState({ passwordError });
        if (usernameError || passwordError) {
            return false;
        } else {
            return true;
        }
    }

    changeUsernameHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    loginUser = (event) => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let loginData = {
                username: this.state.username,
                password: this.state.password
            }
            UserService.login(loginData).then(data => {
                if (typeof data == "string") {
                    AuthService.authenticate(this.state.username, this.state.password, data).then(() => {
                        this.props.history.push('/successfulLogin');
                    })
                } else {
                    this.setState({ submitError: "Invalid credentials!" });
                }
            }
            );
        }
    }

    render() {
        return (
            <div  className="text-center container">
            <div className="row justify-content-center align-items-center minh-80">
                <form action="post" className="shadow-lg p-5 mb-4 bg-secondary">
                    <h2>Log in</h2>
                    <div className="form-group">               
                        <label for="username">Username </label>
                            <input id="username" type="text" className="form-control" placeholder="Enter username" value={this.state.username} onChange={this.changeUsernameHandler} />
                            {this.state.usernameError ? (<div className="text-danger">
                                {this.state.usernameError}
                            </div>) : null}
                    </div>
                    <div className="from-group">
                        <label for="pasword">Password</label>
                        <input id="pasword" type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.changePasswordHandler} />
                        {this.state.passwordError ? (<div className="text-danger">
                            {this.state.passwordError}
                        </div>) : null}
                    </div>
                    
                    <div >
                        <butom type="submit" className="btn btn-ligh btn-lg border m-2" variant="outline-primary" onClick={(event) => this.loginUser(event)}>Sign in</butom>
                    </div>
                    {this.state.submitError ? (<div className="text-danger">
                        {this.state.submitError}
                    </div>) : null}
                    
                    <div className="form-group">
                        <p>
                            Not registered yet? <a href="/sign-up">sign up!</a>
                        </p>
                        <p>
                            Lost password? <a href="/recoverPassword">Recover your password</a>
                        </p>

                    </div>
                </form>
                </div>
            </div>
        );
    }
}

export default LoginComponent;