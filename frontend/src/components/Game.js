import React from "react";
import styled from "styled-components";

import AddGame from "./AddGame";

const GamePage = styled.div`
    flex: 1;
    margin: auto;
    max-width: 500px;
    width: 100%;
`;

class Game extends React.Component {
    render() {
        return (
            <GamePage>
                <AddGame />
            </GamePage>
        );
    }
}

export default Game;
