import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import configureStore from "../store";
import Layout from "./Layout";
import Sample from "./Sample";
import Ranking from "./Ranking";
import AddGame from "./AddGame";

import "./App.css";

let store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Layout>
                    <div className="App">
                        <Route path="/sample" component={Sample} />
                        <Route path="/rank" component={AddGame} />
                        <Route path="/rank" component={Ranking} />
                    </div>
                </Layout>
            </Provider>
        );
    }
}

export default App;
