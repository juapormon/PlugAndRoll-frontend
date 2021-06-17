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
            submitError: ""
        }

        this.saveDeveloper = this.saveDeveloper.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePlayerHandler = this.changePlayerHandler.bind(this);
        this.changeDmHandler = this.changeDmHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeConfirmPasswordHandler = this.changeConfirmPasswordHandler.bind(this);
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

        this.setState({ usernameError });
        this.setState({ emailError });
        this.setState({ passwordError });
        this.setState({ confirmPasswordError });
        if (usernameError || emailError || passwordError || confirmPasswordError) {
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
    changePlayerHandler = () => {
        this.setState({ player: !this.state.player })
    }
    changeDmHandler = () => {
        this.setState({ dm: !this.state.dm })
    }
    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    changeConfirmPasswordHandler = (event) => {
        this.setState({ confirmPassword: event.target.value });
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
            <form style={{width: "80%", padding:"5%"}}>
                <br />
                <br />
                <br />
                <Form className="FormStyle">
                    <h2 style={{ textAlign: "center" }}>Sign up</h2>
                    <br />

                    <Form.Group as={Row}>
                        <Form.Label column sm="30">Username:</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" className="FormInput" placeholder="Username" value={this.state.username} onChange={this.changeUsernameHandler} />
                            {this.state.usernameError ? (<div className="ValidatorMessage">
                                {this.state.usernameError}
                            </div>) : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="30">Email:</Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" className="FormInput" placeholder="Enter email" value={this.state.email} onChange={this.changeEmailHandler} />
                            {this.state.emailError ? (<div className="ValidatorMessage">
                                {this.state.emailError}
                            </div>) : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm="10">
                            <Form.Control type="checkbox" defaultChecked={this.state.player} onChange={this.changePlayerHandler} />
                            <Form.Label column sm="30">Are you a player?</Form.Label>
                        </Col>
                        <Col sm="10">
                            <Form.Control type="checkbox" defaultChecked={this.state.dm} onChange={this.changeDmHandler} />
                            <Form.Label column sm="30">Are you a DM?</Form.Label>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="30">Password:</Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" className="FormInput" placeholder="Enter password" value={this.state.password} onChange={this.changePasswordHandler} />
                            {this.state.passwordError ? (<div className="ValidatorMessage">
                                {this.state.passwordError}
                            </div>) : null}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="30">Confirm password:</Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" className="FormInput" placeholder="Confirm password" value={this.state.confirmPassword} onChange={this.changeConfirmPasswordHandler} />
                            {this.state.confirmPasswordError ? (<div className="ValidatorMessage">
                                {this.state.confirmPasswordError}
                            </div>) : null}
                        </Col>
                    </Form.Group>

                    <div style={{ justifyContent: "center", display: "flex" }}>
                        <Button type="submit" variant="outline-primary" onClick={this.saveDeveloper}>Sign up</Button>
                    </div>
                    {this.state.submitError ? (<div className="ValidatorMessage">
                        {this.state.submitError}
                    </div>) : null}

                    <p className="already-registered text-right">
                        Already registered? <a href="/login">log in</a>
                    </p>
                    <p className="already-registered text-right">
                        Lost password? <a href="/recoverPassword">Recover your password</a>
                    </p>
                    {this.state.spamError ? (<p className="text-danger">{this.state.spamError}</p>) : null}
                </Form>
            </form>
        );
    }
}

export default SignupComponent;