import React from 'react';
import { hot } from 'react-hot-loader/root';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Social Media</h1>
    </div>
  );
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
