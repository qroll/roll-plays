import React from "react";

import Page from "src/components/Container/Page";
import AddGame from "./AddGame";
import GameList from "./GameList";

class Game extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Page>
                    <AddGame />
                    <GameList />
                </Page>
                <Page />
            </React.Fragment>
        );
    }
}

export default Game;
