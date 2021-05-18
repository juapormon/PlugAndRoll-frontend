import React, { Component } from 'react';
<<<<<<< HEAD:src/Components/HeaderComponent.jsx
import logo from '../assets/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { AuthService } from '../Services/AuthService';
=======
import logo from '../../assets/logomejorado.png'
import '../../App.css';
import { AuthService } from '../../Services/AuthService';
>>>>>>> develop:src/Components/Header-Footer/HeaderComponent.jsx

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
<<<<<<< HEAD:src/Components/HeaderComponent.jsx
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark" id="myTopnav">
            <a className="navbar-brand" href="/">
              <img src={logo} alt="logo" style={{width: '55px'}}/>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="/#">Cajas Rojas</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/#">Juan Carlos</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/#">Foros</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/#">FAQ</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/about-us">About us</a>
                  </li>
                
            {AuthService.isAuthenticated() ?
              <React.Fragment>
                <li className="nav-item"><a href="/" className="nav-link" onClick={this.logout}>Logout</a></li>
                <li className="nav-item"><a href="/#" className="nav-link" >{AuthService.getUserData()['username']}</a></li>
              </React.Fragment>
              :
              <React.Fragment>
                <li className="nav-item"><a href="/sign-up" className="nav-link">Sign-up</a></li>
                <li className="nav-item"><a href="/login"  className="nav-link">Login</a></li>
              </React.Fragment>
            }
            </ul>
            </div>
        </nav>
=======
      <div className="topnav" id="myTopnav">
        <a href="/"><img src={logo} className="plugandroll-logo" height="50"/></a>
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
            <a href="/signup" style={{ float: "right", backgroundColor: "#2f47b4" }}>Sign-up</a>
            <a href="/login" style={{ float: "right", backgroundColor: "#2f47b4" }}>Login</a>
          </React.Fragment>
        }

        <a href="#!" className="icon" onClick={this.showElements}>&#9776;</a>
>>>>>>> develop:src/Components/Header-Footer/HeaderComponent.jsx
      </div>
    );
  }
}

export default HeaderComponent;