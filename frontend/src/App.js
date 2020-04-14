import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';

import Map from './components/Map/Map'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Header />
        <div style={{display: "flex"}}>
          <Sidebar />
          <Switch>
            <Route exact path='/' component={Map} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
