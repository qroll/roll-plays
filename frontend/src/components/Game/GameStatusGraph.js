import React from "react";
import styled from "styled-components";
import memoizeOne from "memoize-one";

import Card from "src/components/Container/List";
import { ACCENT, FONT_MAIN } from "src/components/styles";

const Graph = styled(Card)`
    align-items: center;
    display: grid;
    gap: 5px 10px;
    grid-template-columns: auto 1fr;
    margin: 20px 10px;
    padding: 10px;
`;

const Bar = styled.div`
    background-color: ${ACCENT.PRIMARY};
    border-radius: 0.1rem;
    height: 0.5rem;
    width: ${props => props.ratio + "%"};
`;

const Axis = styled.span`
    font-family: ${FONT_MAIN};
    font-size: 0.8rem;
`;

const compute = games => {
    let count = {
        completed: 0,
        played: 0,
        backlog: 0,
        other: 0
    };

    games.forEach(game => {
        if (!game.inLibrary) {
            return;
        }

        switch (game.status) {
            case "completed":
                count.completed++;
                break;
            case "played":
                count.played++;
                break;
            case "backlog":
                count.backlog++;
                break;
            default:
                count.other++;
                break;
        }
    });

    let max = Math.max(...Object.values(count));

    let ratio = {
        completed: (count.completed / max) * 100,
        played: (count.played / max) * 100,
        backlog: (count.backlog / max) * 100,
        other: (count.other / max) * 100
    };

    return ratio;
};

const memoizedCompute = memoizeOne(compute);

export const GameStatusGraph = props => {
    let { games } = props;
    let ratio = memoizedCompute(games);
    return (
        <Graph>
            <Axis>Completed</Axis>
            <Bar ratio={ratio.completed} />
            <Axis>Played</Axis>
            <Bar ratio={ratio.played} />
            <Axis>Backlog</Axis>
            <Bar ratio={ratio.backlog} />
            <Axis>Uncategorized</Axis>
            <Bar ratio={ratio.other} />
        </Graph>
    );
};
