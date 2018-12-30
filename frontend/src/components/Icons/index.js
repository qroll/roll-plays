import React from "react";
import styled from "styled-components";

import { GRAY } from "src/components/styles";

const Div = styled.div`
    flex-shrink: 0;
`;

export const TagIcon = ({ color = GRAY.LIGHT, style }) => {
    return (
        <Div style={style}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={color}
            >
                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
                <path d="M0 0h24v24H0z" fill="none" />
            </svg>
        </Div>
    );
};

export const ControllerIcon = ({ color = GRAY.LIGHT, style }) => {
    return (
        <Div style={style}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={color}
            >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8zM6 15h2v-2h2v-2H8V9H6v2H4v2h2z" />
                <circle cx="14.5" cy="13.5" r="1.5" />
                <circle cx="18.5" cy="10.5" r="1.5" />
            </svg>
        </Div>
    );
};
