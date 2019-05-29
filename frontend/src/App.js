import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import OpretProdukt from './Component/OpretProdukt';
import RetProdukt from './Component/RetProdukt'
import ProduktList from './Component/ProduktList'
import logo from "./logo.png";

class App extends Component {


  render(){
    return (
      //Fil upload af en single fil.
      <Router>
        <div className="container">
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            {/* Link er en forbindelse */}
            <Link to="/" className="navbar-brand">Produkt Oprettelse</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Produkter</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Skab Produkt</Link>
                </li>
              </ul>
            </div>
          </nav>
          
          {/* Route er en rute. */}
          <Route path="/" exact component={ProduktList} />
          <Route path="/edit/:id" component={RetProdukt} />
          <Route path="/create" component={OpretProdukt} />
        </div>
      </Router>
    );
  }
}

export default App;

