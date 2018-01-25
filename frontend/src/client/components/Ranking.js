import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const dummyGames = [
    { id: "1", title: "Portal" },
    { id: "2", title: "The Witness" },
    { id: "3", title: "Prey (2017)" }
];

const reorder = (list, src, dst) => {
    let item = list[src];
    let removed = [...list.slice(0, src), ...list.slice(src + 1)];
    let result = [...removed.slice(0, dst), item, ...removed.slice(dst)];
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

const RankingList = ({ games, onDragEnd }) => (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="rank-list">
            {provided => (
                <div ref={provided.innerRef} style={{ padding: "20px" }}>
                    {games.map((game, index) => (
                        <DraggableRankItem
                            key={game.id}
                            rank={index + 1}
                            game={game}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </DragDropContext>
);

class Ranking extends React.Component {
    state = { games: dummyGames };

    onDragEnd = result => {
        if (!result.destination) {
            return;
        }

        let games = reorder(
            this.state.games,
            result.source.index,
            result.destination.index
        );

        this.setState({ games });
    };

    render() {
        return (
            <RankingList games={this.state.games} onDragEnd={this.onDragEnd} />
        );
    }
}

export default Ranking;
