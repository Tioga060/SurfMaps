import React, { Component } from 'react';

import { MapCard } from './pages/MapSearchPage/components/MapCard/component';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <body className="App-body">
        <MapCard/>
        </body>
      </div>
    );
  }
}

export default App;
