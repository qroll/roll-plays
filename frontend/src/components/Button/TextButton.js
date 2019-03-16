import styled from "styled-components";

import { FONT_TITLE, ACCENT } from "src/components/styles";

const TextButton = styled.button`
    background-color: none;
    border: none;
    font-family: ${FONT_TITLE};
    font-size: 1rem;
    outline: none;
    width: fit-content;

    &:hover,
    &:focus {
        color: ${ACCENT.PRIMARY};
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

export default TextButton;
