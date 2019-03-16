import { remove, insert, reorder } from "src/utils/arrayUtils";

const moveWithin = (rankInfo, source, destination) => {
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

const moveAcross = (rankInfo, source, destination) => {
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

export const handleRankChange = (state, { source, destination }) => {
    const { droppableId: srcId } = source;
    const { droppableId: dstId } = destination;

    let updatedRankInfo;
    if (srcId === dstId) {
        updatedRankInfo = moveWithin(state.rankInfo, source, destination);
    } else {
        updatedRankInfo = moveAcross(state.rankInfo, source, destination);
    }

    return updatedRankInfo;
};
