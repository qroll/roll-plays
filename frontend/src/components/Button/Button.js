import styled from "styled-components";

import { GRAY } from "src/components/styles";

const Button = styled.button`
    align-self: flex-end;
    border: 1px solid ${GRAY.LIGHTER};
    border-radius: 5px;
    background-color: ${GRAY.LIGHTEST};
    color: ${GRAY.DARKER};
    flex: 0 0 auto;
    font-size: 0.9rem;
    margin: 10px;
    outline: none;
    padding: 5px 10px;
    width: fit-content;

    &:hover {
        background-color: ${GRAY.LIGHTER};
    }
`;

export default Button;
