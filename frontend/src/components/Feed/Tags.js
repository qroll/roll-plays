import styled from "styled-components";

import { GRAY } from "src/components/styles";
import { getContrastColor } from "src/utils/color";

export const TagContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const Tag = styled.span`
    background-color: ${props => props.color || "#33516E"};
    border-radius: 3px;
    color: ${props => getContrastColor(props.color || "#33516E")};
    cursor: default;
    flex-shrink: 0;
    font-size: 0.75em;
    height: fit-content;
    margin: 0 5px 5px 0;
    padding: 3px 5px;
    word-break: break-word;
`;

export const TagInput = styled.input`
    background: none;
    border: none;
    flex: 1 auto;
    font-family: "Roboto";
    font-size: 0.75rem;
    padding: 5px;
    outline: none;

    &::placeholder {
        color: ${GRAY.LIGHT};
    }
`;
