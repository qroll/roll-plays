import React from "react";
import styled from "styled-components";

import { ErrorIcon } from "src/components/Icons";
import { GRAY } from "src/components/styles";

const Wrapper = styled.div`
    align-items: center;
    background-color: rgba(206, 17, 38, 0.05);
    border-radius: 5px;
    color: ${GRAY.DARK};
    display: flex;
    font-size: 0.75em;
    padding: 5px;
`;

const ErrorBar = ({ children, style }) => (
    <Wrapper style={style}>
        <ErrorIcon color={GRAY.DARK} style={{ height: "1rem" }} />
        {children}
    </Wrapper>
);

export default ErrorBar;
