import React from "react";
import styled from "styled-components";

import List from "src/components/Container/List";
import ListItem from "src/components/Container/ListItem";
import { GRAY } from "src/components/styles";
import { FormCheckbox, FormDropdown } from "../Form";

const GameInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.span``;
const Library = styled.span`
    color: ${GRAY.MEDIUM};
    font-size: 0.8rem;
`;
const Status = styled.span`
    color: ${GRAY.MEDIUM};
    font-size: 0.8rem;
`;

const MAP_STATUS_FOR_DISPLAY = {
    completed: "Completed",
    played: "Played",
    backlog: "Backlog"
};

export const GameLibrary = props => {
    let { games, massEditMode, onChange, form } = props;
    return (
        <List style={{ margin: "20px 10px" }}>
            {games.map(game => {
                return massEditMode ? (
                    <ListItem id={game._id} key={game._id}>
                        <GameInfo>
                            <Title>{game.title}</Title>
                            <FormCheckbox
                                label="In library"
                                name="inLibrary"
                                isChecked={form[game._id].inLibrary}
                                onChange={onChange(game._id)}
                            />
                            <FormDropdown
                                items={[
                                    { value: "completed", label: "Completed" },
                                    { value: "played", label: "Played" },
                                    { value: "backlog", label: "Backlog" }
                                ]}
                                name="status"
                                value={form[game._id].status}
                                onChange={onChange(game._id)}
                                creatable
                            />
                        </GameInfo>
                    </ListItem>
                ) : (
                    <ListItem id={game._id} key={game._id}>
                        <GameInfo>
                            <Title>{game.title}</Title>
                            <Library>{game.inLibrary && "In library"}</Library>
                            <Status>
                                {MAP_STATUS_FOR_DISPLAY[game.status]}
                            </Status>
                        </GameInfo>
                    </ListItem>
                );
            })}
        </List>
    );
};
