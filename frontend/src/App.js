import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import MapWrapper from './components/MapWrapper'


import './App.css';

function App() {
  return (
    <>
      <Router>
        <Header />
        <div style={{display: "flex"}}>
          <Sidebar />
          <Switch>
            <Route exact path='/' component={MapWrapper} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;

