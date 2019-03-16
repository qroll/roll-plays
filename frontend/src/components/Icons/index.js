import React from "react";
import styled from "styled-components";

import { GRAY } from "src/components/styles";

const Div = styled.div`
    display: inline-block;
    flex-shrink: 0;
    height: 1.5rem;
    width: 1.5rem;
`;

const Svg = styled.svg`
    height: 100%;
    width: 100%;
    fill: ${({ fill }) => fill || GRAY.LIGHT};
    ${({ hover }) =>
        hover
            ? `&:hover {
                fill: ${hover};
        }`
            : ``}
`;

export const TagIcon = ({ color, style }) => {
    return (
        <Div style={style}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={color}
            >
                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
                <path d="M0 0h24v24H0z" fill="none" />
            </Svg>
        </Div>
    );
};

export const ControllerIcon = ({ color, style }) => {
    return (
        <Div style={style}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={color}
            >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8zM6 15h2v-2h2v-2H8V9H6v2H4v2h2z" />
                <circle cx="14.5" cy="13.5" r="1.5" />
                <circle cx="18.5" cy="10.5" r="1.5" />
            </Svg>
        </Div>
    );
};

export const ErrorIcon = ({ color, style }) => {
    return (
        <Div style={style}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={color}
            >
                <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            </Svg>
        </Div>
    );
};

export const DotsHorizontalIcon = ({ color, style, onClick }) => {
    return (
        <Div style={style} onClick={onClick}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={color}
            >
                <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
            </Svg>
        </Div>
    );
};

export const EditIcon = ({ color, style }) => {
    return (
        <Div style={style}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={color}
            >
                <path d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29" />
            </Svg>
        </Div>
    );
};
