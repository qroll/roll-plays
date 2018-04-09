import React from "react";
import styled from "styled-components";

import AddGame from "./AddGame";

const GamePage = styled.div`
    flex: 1;
    margin: 10px;
    width: calc(100% - 20px);

    @media (min-width: 420px) {
        margin: 10px auto;
        max-width: 500px;
    }
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
