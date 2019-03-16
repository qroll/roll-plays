import React from "react";

import { retrieveRanks, normalizeRanks } from "src/actions/rank";
import { remove, insert, reorder } from "src/utils/arrayUtils";
import { GuestOrUserSession } from "../Session";
import { EditableRanking, UneditableRanking } from "./RankingInfoAndGames";

class Ranking extends React.Component {
    state = { rankInfo: {}, games: {}, unrankedGames: {} };

    componentDidMount() {
        retrieveRanks()
            .then(normalizeRanks)
            .then(result => {
                let { rankInfo, games, unrankedGames } = result;
                this.setState({
                    rankInfo,
                    games,
                    unrankedGames
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
        let { rankInfo, games, unrankedGames } = this.state;

        return (
            <GuestOrUserSession
                userComponent={
                    <EditableRanking
                        onDragEnd={this.onDragEnd}
                        rankInfo={Object.values(rankInfo)}
                        gamesById={games}
                        unrankedGames={Object.values(unrankedGames)}
                    />
                }
                guestComponent={
                    <UneditableRanking
                        rankInfo={Object.values(rankInfo)}
                        gamesById={games}
                    />
                }
            />
        );
    }
}

export default Ranking;
