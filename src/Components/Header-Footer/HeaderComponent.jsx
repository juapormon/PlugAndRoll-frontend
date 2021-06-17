import React, { Component } from 'react';
import logo from '../../assets/Plug&Roll-WhiteLetters.png'
import '../../App.css';
import { AuthService } from '../../Services/AuthService';

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
        <a href="/"><img src={logo} className="plugandroll-logo" height="25"/></a>
        <a href="/redbox">Cajas Rojas</a>
        <a href="/forums">Foros</a>
        <a href="/coaching">Coaching</a>
        <a href="/guides">Guides</a>
        {AuthService.isAuthenticated() ?
          <React.Fragment>
            <a href="/" style={{ float: "right", backgroundColor: "#cf0000" }} onClick={this.logout}>Logout</a>
            <a href="/#" style={{ float: "right", backgroundColor: "#2f47b4" }}>{AuthService.getUserData().sub}</a>
          </React.Fragment>
          :
          <React.Fragment>
            <a href="/signup" style={{ float: "right", backgroundColor: "#2f47b4" }}>Sign-up</a>
            <a href="/login" style={{ float: "right", backgroundColor: "#2f47b4" }}>Login</a>
          </React.Fragment>
        }

        <a href="#!" className="icon" onClick={this.showElements}>&#9776;</a>
      </div>
    );
  }
}

export default HeaderComponent;