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
        price: "",
        purchasePrice: "",
        status: "",
        rating: ""
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
                <button onClick={this.handleOnClick} className="button">
                    Add
                </button>
            </div>
        );
    }
}

export default AddGame;
