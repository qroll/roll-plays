import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import RankingInfo from "./RankingInfo";

import { callApi } from "src/utils/callApi";

const remove = (list, index) => [
    ...list.slice(0, index),
    ...list.slice(index + 1)
];

const insert = (list, index, item) => [
    ...list.slice(0, index),
    item,
    ...list.slice(index)
];

const reorder = (list, src, dst) => {
    let item = list[src];
    let removed = remove(list, src);
    let result = insert(removed, dst, item);
    return result;
};

const Item = styled.div`
    background-color: #fafafa;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    cursor: default;
    margin: 10px;
`;

const ItemRank = styled.div`
    background-color: #f07241;
    color: #ffffff;
    display: inline-block;
    font-family: "Roboto Condensed";
    font-size: 0.8em;
    margin: 10px;
    padding: 5px;
    vertical-align: middle;
`;

const ItemTitle = styled.div`
    color: #333333;
    display: inline-block;
    margin: 10px 10px 10px 0;
    vertical-align: middle;
`;

const DraggableRankItem = ({ rank, game = {} }) => (
    <Draggable draggableId={game._id}>
        {provided => (
            <div
                ref={provided.innerRef}
                style={provided.draggableStyle}
                {...provided.dragHandleProps}
            >
                <Item>
                    <ItemRank>{rank}</ItemRank>
                    <ItemTitle>{game.title}</ItemTitle>
                </Item>
                {provided.placeholder}
            </div>
        )}
    </Draggable>
);

const RankingList = ({ ranking, games, onDragEnd }) => (
    <div>
        <RankingInfo name={ranking.name} description={ranking.description} />
        <Droppable droppableId={ranking._id}>
            {provided => (
                <div ref={provided.innerRef}>
                    {ranking.games.map((gameId, index) => (
                        <DraggableRankItem
                            key={gameId}
                            rank={index + 1}
                            game={games[gameId]}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
);

class Ranking extends React.Component {
    state = { rankedGames: {}, games: {} };

    componentDidMount() {
        callApi("/rank").then(res => {
            let { data } = res;
            let rankedGames = {};
            data.ranks.forEach(rank => (rankedGames[rank._id] = rank));
            this.setState({ rankedGames });
        });
        callApi("/game").then(res => {
            let { data } = res.data;
            let games = {};
            data.games.forEach(game => (games[game._id] = game));
            this.setState({ games });
        });
    }

    onDragEnd = result => {
        if (!result.destination) {
            return;
        }

        const {
            source: { droppableId: srcId },
            destination: { droppableId: dstId },
            source,
            destination
        } = result;

        if (srcId === dstId) {
            let games = reorder(
                this.state.rankedGames[srcId].games,
                source.index,
                destination.index
            );

            this.setState({
                rankedGames: {
                    ...this.state.rankedGames,
                    [srcId]: {
                        ...this.state.rankedGames[srcId],
                        games
                    }
                }
            });
        } else {
            let dstGames = insert(
                this.state.rankedGames[dstId].games,
                destination.index,
                this.state.rankedGames[srcId].games[source.index]
            );
            let srcGames = remove(
                this.state.rankedGames[srcId].games,
                source.index
            );

            this.setState({
                rankedGames: {
                    ...this.state.rankedGames,
                    [srcId]: {
                        ...this.state.rankedGames[srcId],
                        games: srcGames
                    },
                    [dstId]: {
                        ...this.state.rankedGames[dstId],
                        games: dstGames
                    }
                }
            });
        }
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {Object.values(this.state.rankedGames).map((ranking, index) => (
                    <RankingList
                        key={index}
                        ranking={ranking}
                        games={this.state.games}
                        onDragEnd={this.onDragEnd}
                    />
                ))}
            </DragDropContext>
        );
    }
}

export default Ranking;
