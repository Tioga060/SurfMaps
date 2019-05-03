import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './MaterialTheme';
import { TopBar } from './components/TopBar';
import { EditMap } from 'pages/MapPage/views/EditMap';
import { MapPageContainer } from 'pages/MapPage';
import './App.scss'; // used for bootstrap utils

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <TopBar/>
        <EditMap />
      </MuiThemeProvider>
    );
  }
}

export default App;
