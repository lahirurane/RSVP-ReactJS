import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Wedding from './components/layout/Wedding';
import HomeComing from './components/layout/HomeComing';

import './App.css';

//If coming to landing page redirect to default page
if (window.location.pathname === '/') {
  window.location.href = '/hc';
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <Route exact path="/hc" component={HomeComing} />
            <Route exact path="/wedding" component={Wedding} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
