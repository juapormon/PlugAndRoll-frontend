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
import RedBoxListComponent from './Components/RedBox/RedBoxListComponent';
import RedBoxCreateComponent from './Components/RedBox/RedBoxCreateComponent';
import RedBoxDetailsComponent from './Components/RedBox/RedBoxDetailsComponent';
import RedBoxUpdateComponent from './Components/RedBox/RedBoxUpdateComponent';
import ForumListComponent from './Components/Forum/ForumListComponent';
import ThreadListComponent from './Components/Thread/ThreadListComponent';
import PublicationListComponent from './Components/Publication/PublicationListComponent';
import CreateThreadComponent from './Components/Thread/CreateThreadComponent';
import OfferListComponent from './Components/Offer/OfferListComponent';
import CreateApplicationComponent from './Components/Application/CreateApplicationComponent';
import CreateOfferComponent from './Components/Offer/CreateOfferComponent';
import MyApplicationsComponent from './Components/Application/MyApplicationsComponent';
import OfferComponent from './Components/Offer/OfferComponent';
import PanicComponent from './Components/PanicComponent';

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
              <Route path="/redbox" exact component={RedBoxListComponent}></Route>
              <Route path="/createRedBox" exact component={RedBoxCreateComponent}></Route>
              <Route path="/redboxDetails/:id" exact component={RedBoxDetailsComponent}></Route>
              <Route path="/redboxUpdate/:id" exact component={RedBoxUpdateComponent}></Route>
              <Route path="/forums" exact component={ForumListComponent}></Route>
              <Route path="/forums/*/threads" exact component={ThreadListComponent}></Route>
              <Route path="/threads/*/publications" exact component={PublicationListComponent}></Route>
              <Route path="/forums/*/createThread" exact component={CreateThreadComponent}></Route>
              <Route path="/forums/*/editThread/*" exact component={CreateThreadComponent}></Route>
              <Route path="/coaching" exact component={OfferListComponent}></Route>
              <Route path="/offers/create" exact component={CreateOfferComponent}></Route>
              <Route path="/offers/*/offerDetails" exact component={OfferComponent}></Route>
              <Route path="/offers/*/apply" exact component={CreateApplicationComponent}></Route>
              <Route path="/myApplications" exact component={MyApplicationsComponent}></Route>
              <Route path="/panic" exact component={PanicComponent}></Route>
            </Switch>
          </div>
        </body>
        <FooterComponent />
      </Router>
    </React.Fragment>
  );
}

export default App;