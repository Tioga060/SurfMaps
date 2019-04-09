import { Component, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";
import { Provider } from "redux-zero/preact";
import store from "./store";

import Header from "./header";
import Home from "./routes/home";
import {Profile} from "./routes/profile";

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
                        <Route path="/maps/" component={Profile} map={null} />
                        <Route path="/maps/:map" component={Profile} />
                    </Router>
                </Provider>
            </div>
        );
    }
}
