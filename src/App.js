import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
    );
  }
}


function Welcome(prop){
  return <h1> Hello {prop.name} </h1>;
}

export default App;
