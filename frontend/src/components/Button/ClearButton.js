import styled from "styled-components";

import { FONT_TITLE } from "src/components/styles";

const ClearButton = styled.button`
    background-color: rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 3px;
    color: #fff;
    font-family: ${FONT_TITLE};
    font-size: 1rem;
    outline: none;
    padding: 10px 15px;
    width: fit-content;

    &:hover,
    &:focus {
        color: #000;
        transform: scale(1.05);
    }

    &:disabled {
        color: #fff;
        cursor: not-allowed;
        transform: none;
    }
`;

export default ClearButton;
