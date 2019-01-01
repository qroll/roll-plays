import React from "react";
import styled from "styled-components";

import { callApi } from "src/utils/callApi";

import List from "src/components/Container/List";
import ListItem from "src/components/Container/ListItem";

const StyledList = styled(List)`
    margin: 20px 10px;
`;

class GameList extends React.Component {
    state = {
        games: []
    };

    componentDidMount() {
        callApi("/game").then(res => {
            let games = res.data.data;
            this.setState({ games: games });
        });
    }

    render() {
        let { games } = this.state;

        return (
            <StyledList>
                {games.map(game => {
                    return (
                        <ListItem id={game._id} key={game._id}>
                            {game.title}
                        </ListItem>
                    );
                })}
            </StyledList>
        );
    }
}

export default GameList;
