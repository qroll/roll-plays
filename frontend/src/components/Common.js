import styled from "styled-components";

import { Link } from "react-router-dom";

export const ALink = styled.a`
    color: #333333;
    text-decoration: none;

    &:hover {
        color: #000;
    }

    &:active {
        color: #f07241;
    }
`;

export const AppLink = styled(Link)`
    color: #333333;
    text-decoration: none;
    width: fit-content;

    &:hover {
        color: #000;
    }

    &:active {
        color: #f07241;
    }
`;

export const TextLink = styled.span`
    color: #333333;
    cursor: pointer;
    width: fit-content;

    &:hover {
        color: #000;
    }
`;
