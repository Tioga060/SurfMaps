import React, { Component } from 'react';

import { MapCard } from './pages/MapSearchPage/components/MapCard/component';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <header className="App-header">
        </header>
        
        <div className="App-body">
          <MapCard/>
        </div>
      </>
    );
  }
}

export default App;
