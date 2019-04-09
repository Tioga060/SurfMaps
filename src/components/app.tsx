import { Component, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";
import { Provider } from "redux-zero/preact";
import store from "./store";

import Home from "./routes/home";
import {Profile} from "./routes/profile";
import Header from "./header";

if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

export default class App extends Component {
    public currentUrl?: string;
    public handleRoute = (e: RouterOnChangeArgs) => {
        this.currentUrl = e.url;
    }; 

    public render() {
        return (
            <div id="app">
            
                <Header />
                <Provider store={store}>
                    <Router onChange={this.handleRoute}>
                        <Route path="/" component={Home} />
                        <Route path="/profile/" component={Profile} user="me" />
                        <Route path="/profile/:user" component={Profile} />
                    </Router>
                </Provider>
            </div>
        );
    }
}
