import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import PruebaComponent from './Components/Prueba/PruebaComponent';
import LoginComponent from './Components/LoginComponent';
import FooterComponent from './Components/FooterComponent';
import HeaderComponent from './Components/HeaderComponent';
import HomeComponent from './Components/HomeComponent';
import AboutUsComponent from './Components/AboutUsComponent';

function App() {
  return (
    <React.Fragment>
      <Router>
       <HeaderComponent/>
        <body>
          <div className="App-header">
            <Switch>
              {/* Aqui van los componentes que se creen*/}
              <Route path="/prueba" exact component={PruebaComponent}></Route>
              <Route path="/login" exact component={LoginComponent}></Route>
              <Route path="/" exact component={HomeComponent}></Route>
              <Route path="/about-us" exact component={AboutUsComponent}></Route>
            </Switch>
          </div>
        </body>
        <FooterComponent/>
      </Router>
    </React.Fragment>
  );
}

export default App;
