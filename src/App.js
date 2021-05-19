import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from './Components/Header-Footer/HeaderComponent';
import FooterComponent from './Components/Header-Footer/FooterComponent';
import HomeComponent from './Components/HomeComponent';
import SignupComponent from './Components/Signup-Login/SignupComponent';
import LoginComponent from './Components/Signup-Login/LoginComponent';
import SuccessfulLoginComponent from './Components/Signup-Login/SuccessfulLoginComponent';
import GuidesComponent from './Components/StarterGuides/GuidesComponent';
import DmGuideComponent from './Components/StarterGuides/DmGuideComponent';
import PlayerGuideComponent from './Components/StarterGuides/PlayerGuideComponent';

function App() {
  return (
    <React.Fragment>
      <Router>
        <HeaderComponent />
        <body>
          <div className="App-header">
            <Switch>
              {/* Aqui van los componentes que se creen*/}
              <Route path="/" exact component={HomeComponent}></Route>
              <Route path="/signup" exact component={SignupComponent}></Route>
              <Route path="/login" exact component={LoginComponent}></Route>
              <Route path="/successfulLogin" exact component={SuccessfulLoginComponent}></Route>
              <Route path="/guides" exact component={GuidesComponent}></Route>
              <Route path="/dmGuide" exact component={DmGuideComponent}></Route>
              <Route path="/playerGuide" exact component={PlayerGuideComponent}></Route>
            </Switch>
          </div>
        </body>
        <FooterComponent />
      </Router>
    </React.Fragment>
  );
}

export default App;