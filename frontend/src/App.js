import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import MapWrapper from './components/MapWrapper';
import DropDownMenu from './components/DropDownMenu';
import UserMenu from './components/UserMenu';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Header />
          <Sidebar />
          {/* <UserMenu /> */}
          <DropDownMenu />
          <div className="authors">
            <p>Map developed by Dr. Amine Korchi, Singularity Consulting Switzerland & Propulsion Academy Zurich.</p>
          </div>
          <div className="legal-right">
            <p>source of data: <a href="https://clinicaltrials.gov/" target="_blank" rel="noopener noreferrer">clinicaltrials.gov</a>.</p>
            <p>Legal right: <a href="https://clinicaltrials.gov/ct2/about-site/terms-conditions#Use" target="_blank" rel="noopener noreferrer">Learn more</a>.</p>
          </div>
          <Switch>
            <Route exact path='/' component={MapWrapper} />
          </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
