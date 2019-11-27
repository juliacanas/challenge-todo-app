import React, { Component } from 'react';
import './App.css';
import Todo from './components/Todo';



class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>My tasks</h1>
        <Todo />
      </div>
    );
  }
}

export default App;
