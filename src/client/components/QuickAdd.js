import React from "react";

import { UserSession } from "./Session";

import "./AddGame.css";

class QuickAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = { game: "" };
    }

    handleOnChange = e => {
        this.setState({ game: e.target.value });
    };

    handleOnClick = () => {
        console.log("whoo");
        this.setState({ game: "" });
    };

    render() {
        return (
            <UserSession>
                <div className="add-game-box">
                    <input
                        type="text"
                        onChange={this.handleOnChange}
                        value={this.state.game}
                        className="input-text"
                        style={{ borderRight: 0 }}
                    />
                    <button onClick={this.handleOnClick} className="button">
                        Add
                    </button>
                </div>;
            </UserSession>
        );
    }
}

export default QuickAdd;
