import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import RankingInfo from "./RankingInfo";
import { GRAY, ACCENT, WHITE, RGBA } from "src/components/styles";

const RankCategory = styled.div`
    margin: auto;
    max-width: 460px;
    padding-bottom: 1rem;
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
    color: ${WHITE};
    display: inline-block;
    font-family: "Roboto Condensed";
    font-size: 0.8em;
    margin: 10px;
    padding: 5px;
    vertical-align: middle;
`;

const ItemTitle = styled.div`
    color: ${GRAY.DARKEST};
    display: inline-block;
    margin: 10px 10px 10px 0;
    vertical-align: middle;
`;

const Placeholder = styled.div`
    align-items: center;
    background-color: ${RGBA(WHITE, 0.7)};
    border: 2px dotted ${GRAY.LIGHT};
    border-radius: 3px;
    color: ${GRAY.MEDIUM};
    cursor: default;
    display: flex;
    font-size: 0.8rem;
    font-style: italic;
    height: 1.5rem;
    justify-content: center;
    margin: 10px;
    padding: 10px;
`;

const NoGames = () => <Placeholder>No games here</Placeholder>;

const RankItem = ({ rank, game = {} }) => (
    <Item>
        <ItemRank>{rank}</ItemRank>
        <ItemTitle>{game.title}</ItemTitle>
    </Item>
);

const DraggableRankItem = ({ index, rank, game }) => (
    <Draggable draggableId={`game-${game.id}`} index={index}>
        {provided => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <RankItem rank={rank} game={game} />
            </div>
        )}
    </Draggable>
);

const DroppableRankingList = ({ ranking, gamesById }) => (
    <Droppable droppableId={`${ranking.id}`}>
        {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
                <RankCategory>
                    <RankingInfo
                        name={ranking.name}
                        description={ranking.description}
                    />
                    {ranking.games.length ? (
                        ranking.games.map((gameId, index) => (
                            <DraggableRankItem
                                key={gameId}
                                index={index}
                                rank={index + 1}
                                game={gamesById[gameId]}
                            />
                        ))
                    ) : (
                        <NoGames />
                    )}
                    {provided.placeholder}
                </RankCategory>
            </div>
        )}
    </Droppable>
);

const RankingList = ({ ranking, gamesById }) => (
    <RankCategory>
        <RankingInfo name={ranking.name} description={ranking.description} />
        {ranking.games.length ? (
            ranking.games.map((gameId, index) => (
                <RankItem
                    key={gameId}
                    index={index}
                    rank={index + 1}
                    game={gamesById[gameId]}
                />
            ))
        ) : (
            <NoGames />
        )}
    </RankCategory>
);

const UnrankedGameList = ({ games }) => (
    <Droppable droppableId={"-1"}>
        {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
                <RankCategory>
                    <RankingInfo
                        name="Unranked"
                        // description=
                    />
                    {games.length ? (
                        games.map((game, index) => (
                            <RankItem
                                key={game.id}
                                index={index}
                                rank={index + 1}
                                game={game}
                            />
                        ))
                    ) : (
                        <NoGames />
                    )}
                    {provided.placeholder}
                </RankCategory>
            </div>
        )}
    </Droppable>
);

export const EditableRanking = ({
    onDragEnd = () => {},
    rankInfo = [],
    gamesById = {},
    unrankedGames = []
}) => (
    <DragDropContext onDragEnd={onDragEnd}>
        {rankInfo.map(ranking => (
            <DroppableRankingList
                key={ranking.id || 0}
                ranking={ranking}
                gamesById={gamesById}
                onDragEnd={this.onDragEnd}
            />
        ))}
        <UnrankedGameList games={unrankedGames} />
    </DragDropContext>
);

export const UneditableRanking = ({ rankInfo = [], gamesById = {} }) => (
    <React.Fragment>
        {rankInfo.map(ranking => (
            <RankingList
                key={ranking.id || 0}
                ranking={ranking}
                gamesById={gamesById}
                onDragEnd={this.onDragEnd}
            />
        ))}
    </React.Fragment>
);
