import styled, { keyframes } from "styled-components";

const blinking = keyframes`
    0%   { opacity: 0; }
    100% { opacity: 1; }
`;

const Caret = styled.div`
    background-color: #000;
    height: 1rem;
    width: 1px;
    margin-left: -2px;
    position: absolute;
    animation: ${blinking} 1s steps(2) infinite;
`;

export default Caret;
