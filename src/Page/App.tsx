import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'shared/styles';
import { TopBar } from './components/TopBar';
import { EditMap } from 'pages/MapPage/views/EditMap';
import { MapPageContainer } from 'pages/MapPage';
import './App.scss'; // used for bootstrap utils

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <TopBar/>
        <EditMap mapId="0b9be36f-7fe1-4974-ae5f-19f775bec982"/> 
      </MuiThemeProvider>
    );
  }
}

export default App;
