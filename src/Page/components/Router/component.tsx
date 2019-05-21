import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MapPageRouter } from 'pages/MapPage';

export const PageRouter: React.StatelessComponent = () => (
    <Router>
        <Route path="/maps" component={MapPageRouter}/>
    </Router>
);
