import React from "react";

import { UserSession } from "./Session";

import "./AddGame.css";

class AddGame extends React.Component {
    state = {
        appID: "",
        title: "",
        description: "",
        releaseDate: "",
        inLibrary: "",
        purchasePrice: "",
        bundleName: "",
        status: "",
        rating: "",
        bundleField: false
    };

    handleOnAppIDChange = e => {
        let input = e.target.value;
        // http://store.steampowered.com/app/386620/Cook_Serve_Delicious_2/
        let urlRegex = /(?:^http:\/\/)?store\.steampowered\.com\/app\/([0-9]+)(\/\.+)?/;
        let result = urlRegex.exec(input);

        if (result) {
            this.setState({ appID: result[1] });
        } else {
            this.setState({ appID: input });
        }
    };

    handleInputChange = e => {
        if (e.target.type === "checkbox") {
            this.setState({ [e.target.name]: e.target.checked });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    };

    handleOnClick = () => {
        console.log("whoo");
        this.setState({ game: "" });
    };

    toggleBundleField = () => {
        this.setState(prevState => {
            return { bundleField: !prevState.bundleField };
        });
    };

    render() {
        return (
            <div className="add-game-box">
                <label className="form-control">
                    <span className="input-label">App ID</span>
                    <input
                        type="text"
                        className="input-text"
                        name="appID"
                        value={this.state.appID}
                        placeholder="App ID on Steam"
                        onChange={this.handleOnAppIDChange}
                    />
                </label>
                <label className="form-control">
                    <span className="input-label">Title</span>
                    <input
                        type="text"
                        className="input-text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label className="form-control">
                    <span className="input-label">Description</span>
                    <input
                        type="text"
                        className="input-text"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label className="form-control">
                    <span className="input-label">Release date</span>
                    <input
                        type="text"
                        className="input-text"
                        name="releaseDate"
                        value={this.state.releaseDate}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label className="form-control">
                    <input
                        type="checkbox"
                        className="input-checkbox"
                        name="inLibrary"
                        checked={this.state.inLibrary}
                        onChange={this.handleInputChange}
                    />
                    <span className="input-label">In library</span>
                </label>
                {this.state.inLibrary && (
                    <label className="form-control">
                        <span className="input-label">Purchase price</span>
                        <input
                            type="text"
                            className="input-text"
                            name="purchasePrice"
                            value={this.state.purchasePrice}
                            onChange={this.handleInputChange}
                        />
                    </label>
                )}
                <label className="form-control">
                    <input
                        type="checkbox"
                        className="input-checkbox"
                        name="isFromBundle"
                        checked={this.state.isFromBundle}
                        onChange={this.toggleBundleField}
                    />
                    <span className="input-label">In bundle</span>
                </label>
                {this.state.bundleField && (
                    <label className="form-control">
                        <span className="input-label">Bundle</span>
                        <input
                            type="text"
                            className="input-text"
                            name="bundleName"
                            value={this.state.bundleName}
                            onChange={this.handleInputChange}
                        />
                    </label>
                )}
                <label className="form-control">
                    <span className="input-label">Status</span>
                    <input
                        type="text"
                        className="input-text"
                        name="status"
                        value={this.state.status}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label className="form-control">
                    <span className="input-label">Rating</span>
                    <input
                        type="text"
                        className="input-text"
                        name="rating"
                        value={this.state.rating}
                        onChange={this.handleInputChange}
                    />
                </label>
                <button onClick={this.handleOnClick} className="button">
                    Add
                </button>
            </div>
        );
    }
}

export default AddGame;
