import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { normalize, schema } from "normalizr";

import RankingInfo from "./RankingInfo";
import { GRAY, ACCENT, WHITE } from "src/components/styles";

import { retrieveRanks } from "src/actions/rank";
import { remove, insert, reorder } from "src/utils/arrayUtils";

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

const DraggableRankItem = ({ index, rank, game = {} }) => (
    <Draggable draggableId={`game-${game.id}`} index={index}>
        {provided => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <Item>
                    <ItemRank>{rank}</ItemRank>
                    <ItemTitle>{game.title}</ItemTitle>
                </Item>
            </div>
        )}
    </Draggable>
);

const RankingList = ({ ranking, games }) => (
    <Droppable droppableId={`${ranking.id}`}>
        {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
                <RankCategory>
                    <RankingInfo
                        name={ranking.name}
                        description={ranking.description}
                    />
                    {ranking.games.map((gameId, index) => (
                        <DraggableRankItem
                            key={gameId}
                            index={index}
                            rank={index + 1}
                            game={games[gameId]}
                        />
                    ))}
                    {provided.placeholder}
                </RankCategory>
            </div>
        )}
    </Droppable>
);

class Ranking extends React.Component {
    state = { rankInfo: {}, games: {} };

    componentDidMount() {
        retrieveRanks().then(ranks => {
            let { rankedGames, unrankedGames } = ranks;

            const gameSchema = new schema.Entity("games");
            const rankSchema = new schema.Entity("ranks", {
                games: [gameSchema]
            });
            const gameListSchema = [gameSchema];
            const rankListSchema = [rankSchema];

            let normalizedRanks = normalize(rankedGames, rankListSchema);
            let normalizedGames = normalize(unrankedGames, gameListSchema);

            this.setState({
                rankInfo: normalizedRanks.entities.ranks,
                games: {
                    ...normalizedRanks.entities.games,
                    ...normalizedGames.entities.games
                }
            });
        });
    }

    moveWithin = (rankInfo, source, destination) => {
        const { droppableId: srcId, index: srcIndex } = source;
        const { index: dstIndex } = destination;

        let rankInfoToUpdate = rankInfo[srcId];
        let games = reorder(rankInfoToUpdate.games, srcIndex, dstIndex);

        rankInfoToUpdate = { ...rankInfoToUpdate, games };

        return {
            ...rankInfo,
            [srcId]: rankInfoToUpdate
        };
    };

    moveAcross = (rankInfo, source, destination) => {
        const { droppableId: srcId, index: srcIndex } = source;
        const { droppableId: dstId, index: dstIndex } = destination;

        let rankSrcInfo = rankInfo[srcId];
        let rankDstInfo = rankInfo[dstId];

        let dstGames = insert(
            rankDstInfo.games,
            dstIndex,
            rankSrcInfo.games[srcIndex]
        );
        let srcGames = remove(rankSrcInfo.games, srcIndex);

        rankSrcInfo = { ...rankSrcInfo, games: srcGames };
        rankDstInfo = { ...rankDstInfo, games: dstGames };

        return {
            ...rankInfo,
            [srcId]: rankSrcInfo,
            [dstId]: rankDstInfo
        };
    };

    onDragEnd = result => {
        if (!result.destination) {
            return;
        }

        const { source, destination } = result;
        const { droppableId: srcId, index: srcIndex } = source;
        const { droppableId: dstId, index: dstIndex } = destination;

        if (srcId === dstId && srcIndex === dstIndex) {
            return;
        }

        let updatedRankInfo;
        if (srcId === dstId) {
            updatedRankInfo = this.moveWithin(
                this.state.rankInfo,
                source,
                destination
            );
        } else {
            updatedRankInfo = this.moveAcross(
                this.state.rankInfo,
                source,
                destination
            );
        }

        this.setState({
            rankInfo: updatedRankInfo
        });
    };

    render() {
        let { rankInfo, games } = this.state;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {Object.values(rankInfo).map(ranking => (
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
