import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import configureStore from "../store";

import Layout from "./Layout";
import AddGame from "./AddGame";
import Feed from "./Feed";
import Login from "./Login";
import RankPage from "./RankPage";

import { SessionChecker } from "./Session";

let store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <SessionChecker>
                    <Layout>
                        <Route path="/feed" component={Feed} />
                        <Route path="/game" component={AddGame} />
                        <Route path="/login" component={Login} />
                        <Route path="/rank" component={RankPage} />
                    </Layout>
                </SessionChecker>
            </Provider>
        );
    }
}

export default App;
