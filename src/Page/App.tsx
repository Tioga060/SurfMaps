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
        <EditMap mapId="e20a024f-58de-415a-bc81-a84cdf2036f3"/> 
      </MuiThemeProvider>
    );
  }
}
//mapId="8d5f99bf-5d77-4844-a648-9a6e1dbf795b"
export default App;
