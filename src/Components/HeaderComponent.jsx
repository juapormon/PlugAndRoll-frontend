import React, { Component } from 'react';
import logo from '../assets/logomejorado.png'
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
        <a href="/"><img src={logo} className="plugandroll-logo" /></a>
        <a href="/#">Cajas Rojas</a>
        <a href="/#">Juan Carlos</a>
        <a href="/#">Foros</a>
        <a href="/#">FAQ</a>
        <a href="/#">About us</a>
        {AuthService.isAuthenticated() ?
          <React.Fragment>
            <a href="/" style={{ float: "right", backgroundColor: "#cf0000" }} onClick={this.logout}>Logout</a>
            <a href="/#" style={{ float: "right", backgroundColor: "#2f47b4" }}>{AuthService.getUserData()['username']}</a>
          </React.Fragment>
          :
          <React.Fragment>
            <a href="/sign-up" style={{ float: "right", backgroundColor: "#2f47b4" }}>Sign-up</a>
            <a href="/login" style={{ float: "right", backgroundColor: "#2f47b4" }}>Login</a>
          </React.Fragment>
        }

        <a href="#!" className="icon" onClick={this.showElements}>&#9776;</a>
      </div>
    );
  }
}

export default HeaderComponent;