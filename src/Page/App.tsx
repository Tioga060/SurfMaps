import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './MaterialTheme';
import { TopBar } from './components/TopBar';
import './App.scss';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <TopBar/>
      </MuiThemeProvider>
    );
  }
}

export default App;
