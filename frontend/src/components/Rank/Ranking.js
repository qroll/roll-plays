import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { normalize, schema } from "normalizr";

import RankingInfo from "./RankingInfo";
import { GRAY, ACCENT, WHITE } from "src/components/styles";

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

const RankCategory = styled.div`
    margin: auto;
    max-width: 460px;
`;

const Item = styled.div`
    background-color: ${WHITE};
    border: 1px solid ${GRAY.LIGHTER};
    border-radius: 3px;
    cursor: default;
    margin: 10px;
`;

const ItemRank = styled.div`
    background-color: ${ACCENT.PRIMARY_MUTED};
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

const RankingList = ({ ranking, games, onDragEnd }) => (
    <RankCategory>
        <RankingInfo name={ranking.name} description={ranking.description} />
        <Droppable droppableId={`rank-${ranking.id}`}>
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
    </RankCategory>
);

class Ranking extends React.Component {
    state = { rankInfo: [], games: {} };

    componentDidMount() {
        callApi("/rank").then(res => {
            let { rankedGames, unrankedGames } = res.data.data;

            const gameSchema = new schema.Entity("games");
            const rankSchema = [{ games: [gameSchema] }];
            const gameListSchema = [gameSchema];

            let normalizedRanks = normalize(rankedGames, rankSchema);
            let normalizedGames = normalize(unrankedGames, gameListSchema);

            this.setState({
                rankInfo: normalizedRanks.result,
                games: {
                    ...normalizedRanks.entities.games,
                    ...normalizedGames.entities.games
                }
            });
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
                this.state.rankInfo[srcId].games,
                source.index,
                destination.index
            );

            this.setState({
                rankInfo: {
                    ...this.state.rankInfo,
                    [srcId]: {
                        ...this.state.rankInfo[srcId],
                        games
                    }
                }
            });
        } else {
            let dstGames = insert(
                this.state.rankInfo[dstId].games,
                destination.index,
                this.state.rankInfo[srcId].games[source.index]
            );
            let srcGames = remove(
                this.state.rankInfo[srcId].games,
                source.index
            );

            this.setState({
                rankInfo: {
                    ...this.state.rankInfo,
                    [srcId]: {
                        ...this.state.rankInfo[srcId],
                        games: srcGames
                    },
                    [dstId]: {
                        ...this.state.rankInfo[dstId],
                        games: dstGames
                    }
                }
            });
        }
    };

    render() {
        let { rankInfo, games } = this.state;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {rankInfo.map(ranking => (
                    <RankingList
                        key={ranking.id || 0}
                        ranking={ranking}
                        games={games}
                        onDragEnd={this.onDragEnd}
                    />
                ))}
            </DragDropContext>
        );
    }
}

export default Ranking;
