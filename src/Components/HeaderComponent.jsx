import React, { Component } from 'react';
import logo from '../assets/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
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
      </div>
    );
  }
}

export default HeaderComponent;