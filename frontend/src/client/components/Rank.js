import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./Rank.css";

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

const DraggableRankItem = ({ rank, game }) => (
    <Draggable draggableId={game.id}>
        {provided => (
            <div
                ref={provided.innerRef}
                style={provided.draggableStyle}
                {...provided.dragHandleProps}
            >
                <div className="rank-item">
                    <div className="rank-item-rank">{rank}</div>
                    <div className="rank-item-title">{game.title}</div>
                </div>
                {provided.placeholder}
            </div>
        )}
    </Draggable>
);

const Rank = ({ games = dummyGames, onDragEnd }) => (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="rank-list">
            {provided => (
                <div ref={provided.innerRef} className="rank-list">
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

class RankPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { games: dummyGames };
    }

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
        return <Rank games={this.state.games} onDragEnd={this.onDragEnd} />;
    }
}

export default RankPage;
