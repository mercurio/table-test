import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import TableTest from './components/TableTest'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Table Test</h1>
        </header>
        <p className="App-intro">
          Demonstration of TableTest from <code>components/TableTest.js</code>
        </p>
        <TableTest width="500" height="500" />
      </div>
    );
  }
}

export default App;
