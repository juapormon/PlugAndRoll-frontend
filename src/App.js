import './App.css';
import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import PruebaComponent from './Components/Prueba/PruebaComponent';

function App() {
  return (
    <React.Fragment>
      <Router>
       {/* <HeaderComponent/>*/}
        <body>
          <div className="App-header">
            <Switch>
              {/* Aqui van los componentes que se creen*/}
              <Route path="/prueba" exact component={PruebaComponent}></Route>
            </Switch>
          </div>
        </body>
        {/*<FooterComponent/>*/}
      </Router>
    </React.Fragment>
  );
}

export default App;
