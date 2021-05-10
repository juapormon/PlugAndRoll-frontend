import React, { Component } from 'react';
import logo from '../assets/logoplug&rolL.png'
import '../App.css';
import { AuthService } from '../Services/AuthService';

class HeaderComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  showElements() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  logout() {
    AuthService.logout().then(() => {
      alert("You have logged out successfully!");
      window.location.reload();
    })
  }

  render() {
    return (
      <div className="topnav" id="myTopnav">
        <a href="/" className="logo"><img src={logo} className="plugandroll-logo" /></a>
        <a href="/#" className="item">Cajas Rojas</a>
        <a href="/#" className="item">Juan Carlos</a>
        <a href="/#" className="item">Foros</a>
        <a href="/#" className="item">FAQ</a>
        <a href="/about-us" className="item">About us</a>
        {AuthService.isAuthenticated() ?
          <React.Fragment>
            <a href="/" className="login" style={{ float: "right", backgroundColor: "#cf0000" }} onClick={this.logout}>Logout</a>
            <a href="/#" className="login"  style={{ float: "right", backgroundColor: "#2f47b4" }}>{AuthService.getUserData()['username']}</a>
          </React.Fragment>
          :
          <React.Fragment>
            <a href="/sign-up" className="login"  style={{ float: "right", backgroundColor: "#2f47b4" }}>Sign-up</a>
            <a href="/login"  className="login"  style={{ float: "right", backgroundColor: "#2f47b4" }}>Login</a>
          </React.Fragment>
        }

        <a href="#!" className="icon" onClick={this.showElements}>&#9776;</a>
      </div>
    );
  }
}

export default HeaderComponent;