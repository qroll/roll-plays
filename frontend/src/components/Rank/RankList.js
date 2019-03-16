import React from "react";

import { retrieveRanks, editGamesInRanks } from "src/actions/rank";
import { handleRankChange } from "./rankStateManager";

import { GuestOrUserSession } from "src/components/Session";
import { EditableRanking, UneditableRanking } from "./RankingInfoAndGames";

class Ranking extends React.Component {
    state = {
        rankInfo: {},
        games: {},
        isSaving: false,
        hasUnsavedChanges: false
    };

    componentDidMount() {
        retrieveRanks().then(result => {
            let { rankInfo, games } = result;
            this.setState({
                rankInfo,
                games
            });
        });
    }

    onSave = () => {
        this.setState({ isSaving: true, hasUnsavedChanges: false });
        editGamesInRanks(this.state.rankInfo)
            .then(() => {
                this.setState({ isSaving: false });
            })
            .catch(err => {
                this.setState({ isSaving: false });
            });
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

        let updatedRankInfo = handleRankChange(this.state, result);

        this.setState({
            rankInfo: updatedRankInfo,
            hasUnsavedChanges: true
        });
    };

    render() {
        let { rankInfo, games, isSaving, hasUnsavedChanges } = this.state;

        return (
            <GuestOrUserSession
                userComponent={
                    <EditableRanking
                        onDragEnd={this.onDragEnd}
                        onSave={this.onSave}
                        rankInfo={Object.values(rankInfo)}
                        gamesById={games}
                        isSaving={isSaving}
                        hasUnsavedChanges={hasUnsavedChanges}
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
