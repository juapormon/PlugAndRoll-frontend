import React, { Component } from 'react';
import { AuthService } from "../../Services/AuthService";
import { UserService } from '../../Services/UserService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
// import emailjs from 'emailjs-com';

// var serviceID = "service_x4mybgl"

class SignupComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            usernameError: "",
            email: "",
            emailError: "",
            player: false,
            dm: false,
            password: "",
            passwordError: "",
            confirmPassword: "",
            confirmPasswordError: "",
            acceptedPolicy: false,
            acceptedError: "",
            submitError: ""
        }

        this.saveDeveloper = this.saveDeveloper.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePlayerHandler = this.changePlayerHandler.bind(this);
        this.changeDmHandler = this.changeDmHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeConfirmPasswordHandler = this.changeConfirmPasswordHandler.bind(this);
        this.changeAcceptHandler = this.changeAcceptHandler.bind(this);
    }

    componentDidMount() {
        if (AuthService.isAuthenticated()) {
            this.props.history.push('/')
        }
    }

    validate = () => {
        let usernameError = "";
        let emailError = "";
        let passwordError = "";
        let confirmPasswordError = "";
        let acceptedError = "";

        if (this.state.username.trim().length === 0) {
            usernameError = "Username cannot be empty";
        }
        var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!emailPattern.test(this.state.email)) {
            emailError = "Please enter valid email address.";
        }
        if (this.state.email.length === 0) {
            emailError = "Email cannot be empty";
        }
        var passwordPattern = new RegExp(/(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~])[a-zA-Z0-9!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]{8,}/)
        if (!passwordPattern.test(this.state.password)) {
            passwordError = "Password must contain 8 or more characters that are of at least one number, one uppercase and lowercase letter and a special character.";
        }
        if (this.state.password.length === 0) {
            passwordError = "Password cannot be empty";
        }
        if (this.state.password !== this.state.confirmPassword) {
            confirmPasswordError = "Passwords don't match";
        }
        if (this.state.confirmPassword.length === 0) {
            confirmPasswordError = "Password confirmation cannot be empty";
        }
        if (!this.state.acceptedPolicy) {
            acceptedError = "You have to agree to the terms and conditions for signing up!";
        }

        this.setState({ usernameError });
        this.setState({ emailError });
        this.setState({ passwordError });
        this.setState({ confirmPasswordError });
        this.setState({ acceptedError });
        if (usernameError || emailError || passwordError || confirmPasswordError || acceptedError) {
            return false;
        } else {
            return true;
        }
    }

    changeUsernameHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }
    changePlayerHandler = (event) => {
        this.setState({ player: !this.state.player })
    }
    changeDmHandler = (event) => {
        this.setState({ dm: !this.state.dm })
    }
    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    changeConfirmPasswordHandler = (event) => {
        this.setState({ confirmPassword: event.target.value });
    }
    changeAcceptHandler = (event) => {
        this.setState({ acceptedPolicy: !this.state.acceptedPolicy })
    }
    saveDeveloper = (event) => {
        event.preventDefault();
        const isValid = this.validate();
        // const templateId = 'template_7t39cwp';
        if (isValid) {
            let roles = [];
            if (this.state.player && !this.state.dm) {
                roles = ['PLAYER'];
            } else if (this.state.dm && !this.state.player) {
                roles = ['DM'];
            } else if (this.state.player && this.state.dm) {
                roles = ['PLAYER', 'DM'];
            }
            let signupData = {
                username: this.state.username.trim(),
                email: this.state.email,
                password: this.state.password,
                isPremium: false,
                roles: roles
            }
            UserService.signup(signupData).then(data => {
                if (typeof data == "object") {
                    // this.sendFeedback(templateId, {
                    //     to_name: this.state.username,
                    //     email: this.state.email
                    // })
                    this.props.history.push('/login')
                } else {
                    this.setState({ submitError: "Username or email already in use" });
                }
            });
        }
    }

    // sendFeedback = (templateId, variables) => {
    //     emailjs.send(
    //         serviceID, templateId,
    //         variables
    //     ).then(res => {
    //         // Email successfully sent alert
    //         alert('Email Confirmation Successfully Sent')
    //     })
    //         // Email Failed to send Error alert
    //         .catch(err => {
    //             alert('Email Failed to Send')
    //             console.error('Email Confirmation Error:', err)
    //         })
    // }

    render() {
        return (
            <div className="text-center container">
                <div className="row justify-content-center align-items-center minh-85">
                    <form className="shadow-lg p-5 mb-4 bg-secondary">
                        <h2>Sign up</h2>

                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" placeholder="Username" className="form-control form-control-sm w-50 mx-auto"
                                value={this.state.username} onChange={this.changeUsernameHandler} />
                            {this.state.usernameError ? (<div className="text-danger">
                                {this.state.usernameError}
                            </div>) : null}
                            <label>Email:</label>
                            <input type="email" placeholder="Enter email" className="form-control form-control-sm w-50 mx-auto"
                                value={this.state.email} onChange={this.changeEmailHandler} />
                            {this.state.emailError ? (<div className="text-danger">
                                {this.state.emailError}
                            </div>) : null}
                        </div>

                        <div className="form-group">
                            <input type="checkbox" className
                                ="mb-2 mr-sm-2" defaultChecked={this.state.player} onChange={this.changePlayerHandler} />
                            <label className="mb-2 mr-sm-2">Are you a player?</label>
                            <input type="checkbox" className="mb-2 mr-sm-2" defaultChecked={this.state.dm} onChange={this.changeDmHandler} />
                            <label className="mb-2 mr-sm-2">Are you a DM?</label>
                        </div>

                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" placeholder="Enter password" className="form-control form-control-sm w-50 mx-auto"
                                value={this.state.password} onChange={this.changePasswordHandler} />
                            {this.state.passwordError ? (<div className="text-danger">
                                {this.state.passwordError}
                            </div>) : null}
                            <label>Confirm password:</label>
                            <input type="password" placeholder="Confirm password" className="form-control form-control-sm w-50 mx-auto"
                                value={this.state.confirmPassword} onChange={this.changeConfirmPasswordHandler} />
                            {this.state.confirmPasswordError ? (<div className="text-danger">
                                {this.state.confirmPasswordError}
                            </div>) : null}
                        </div>

                        <div style={{ justifyContent: "center", display: "flex" }}>
                            <button type="submit" className="btn btn-ligh btn-lg border m-2" variant="outline-primary" onClick={this.saveDeveloper}>Sign up</button>
                        </div>
                        {this.state.submitError ? (<div className="text-danger">
                            {this.state.submitError}
                        </div>) : null}
                        {this.state.spamError ? (<p className="text-danger">{this.state.spamError}</p>) : null}

                        <div className="form-group">
                            <p className="mx-auto">Already registered? <a href="/login">log in</a></p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignupComponent;