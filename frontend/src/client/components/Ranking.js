import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const dummyRank = {
    "1a": {
        id: "1a",
        name: "Great",
        description:
            "Fantastic gameplay or narrative elements that left a deep impression",
        games: ["39whd", "1dhjk", "aoyd8"]
    },
    "2b": {
        id: "2b",
        name: "Entertaining",
        description: "Solid mechanics, time well spent",
        games: ["91rnc"]
    }
};

const dummyGames = {
    "39whd": { id: "39whd", title: "Portal" },
    "1dhjk": { id: "1dhjk", title: "The Witness" },
    aoyd8: { id: "aoyd8", title: "Prey (2017)" },
    "91rnc": { id: "91rnc", title: "Gunpoint" }
};

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

const DraggableRankItem = ({ rank, game }) => (
    <Draggable draggableId={game.id}>
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

const RankingName = styled.h1`
    font-family: "Roboto Condensed";
    font-size: 1.2em;
    font-weight: normal;
    margin: 0 0 5px 0;
    text-transform: uppercase;
`;

const RankingDescription = styled.p`
    font-size: 0.8em;
    font-style: oblique;
    margin: 5px 0;
`;

const RankingList = ({ ranking, games, onDragEnd }) => (
    <div>
        <RankingName>{ranking.name}</RankingName>
        <RankingDescription>{ranking.description}</RankingDescription>
        <Droppable droppableId={ranking.id}>
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
    state = { rankedGames: dummyRank, games: dummyGames };

    onDragEnd = result => {
        if (!result.destination) {
            return;
        }

        console.log(result);

        if (result.source.droppableId === result.destination.droppableId) {
            let games = reorder(
                this.state.rankedGames[result.source.droppableId].games,
                result.source.index,
                result.destination.index
            );

            this.setState({
                rankedGames: {
                    ...this.state.rankedGames,
                    [result.source.droppableId]: {
                        ...this.state.rankedGames[result.source.droppableId],
                        games
                    }
                }
            });
        } else {
            console.log(
                result.source.droppableId,
                result.destination.droppableId
            );
            let srcGames = remove(
                this.state.rankedGames[result.source.droppableId],
                result.source.index
            );
            let dstGames = insert(
                this.state.rankedGames[result.destination.droppableId],
                result.destination.index
            );

            this.setState({
                rankedGames: {
                    ...this.state.rankedGames,
                    [result.source.droppableId]: {
                        ...this.state.rankedGames[result.source.droppableId],
                        srcGames
                    },
                    [result.destination.droppableId]: {
                        ...this.state.rankedGames[
                            result.destination.droppableId
                        ],
                        dstGames
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
