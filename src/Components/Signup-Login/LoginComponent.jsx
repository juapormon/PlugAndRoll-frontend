import React, { Component } from "react";
import { AuthService } from "../../Services/AuthService";
import { UserService } from '../../Services/UserService';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';

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
                    let authenticated = AuthService.authenticate(this.state.username, this.state.password, data);
                    if (authenticated) {
                        window.location.href = '/';
                    }
                } else {
                    this.setState({ submitError: "Invalid credentials!" });
                }
            }
            );
        }
    }

    render() {
        return (
            <form>
                <br />
                <br />
                <br />
                <form className="FormStyle container">
                    <h2 style={{ textAlign: "center" }}>Log in</h2>
                    <br />

                    <div className="form-group row">
                        <label className="col-4">Username: </label>
                            <input type="text" className="col-6" placeholder="Enter username" value={this.state.username} onChange={this.changeUsernameHandler} />
                            {this.state.usernameError ? (<div className="ValidatorMessage">
                                {this.state.usernameError}
                            </div>) : null}
                    </div>

                    <div className="form-group row">
                        <label className="col-4">Password: </label>
                            <input type="password" className="col-6" placeholder="Enter password" value={this.state.password} onChange={this.changePasswordHandler} />
                            {this.state.passwordError ? (<div className="ValidatorMessage">
                                {this.state.passwordError}
                            </div>) : null}
                    </div>

                    <div style={{ justifyContent: "center", display: "flex" }}>
                        <Button type="submit" variant="outline-primary" onClick={(event) => this.loginUser(event)}>Sign in</Button>
                    </div>
                    {this.state.submitError ? (<div className="ValidatorMessage">
                        {this.state.submitError}
                    </div>) : null}
                    
                    <p>
                        Not registered yet? <a href="/sign-up">sign up!</a>
                    </p>
                    <p>
                        Lost password? <a href="/recoverPassword">Recover your password</a>
                    </p>

                </form>
            </form>
        );
    }
}

export default LoginComponent;