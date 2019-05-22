import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'shared/styles';
import { Body } from './components/Body';

import './App.scss'; // used for bootstrap utils

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Body />
      </MuiThemeProvider>
    );
  }
}
//mapId="8d5f99bf-5d77-4844-a648-9a6e1dbf795b"
export default App;
