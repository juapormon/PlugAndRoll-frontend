import React, { Component } from 'react';
import logo from '../../assets/Plug&Roll-RedLetters.png'
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
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark" id="myTopnav">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="logo" style={{ width: '200px' }} />
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/redbox">Red Boxes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/forums">Forums</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/coaching">Coaching</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/guides">Guides</a>
              </li>
            </ul>
          </div>
          <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar" >
            <ul className="navbar-nav">
              {AuthService.isAuthenticated() ?
                <React.Fragment>
                  <li className="nav-item-float-right"><a href="/" className="nav-link" onClick={this.logout}>Logout</a></li>
                  <li className="nav-item-float-right"><a href="/#" className="nav-link" >{AuthService.getUserData().sub}</a></li>
                </React.Fragment>
                :
                <React.Fragment>
                  <li className="nav-item-float-right"><a href="/signup" className="nav-link">Sign-up</a></li>
                  <li className="nav-item-float-right"><a href="/login" className="nav-link">Login</a></li>
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