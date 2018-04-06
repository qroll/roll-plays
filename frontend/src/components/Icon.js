import React from "react";
import styled from "styled-components";

import icons from "./icons.svg";

const StyledSVG = styled.svg`
    fill: #333;
    height: 20px;
    width: 20px;
    margin-right: 4px;

    &:hover {
        fill: #e0e0e0;
    }
`;

const SVGIcon = ({ name, onClick }) => (
    <StyledSVG onClick={onClick}>
        <use xlinkHref={`${icons}#${name}`} />
    </StyledSVG>
);

export default SVGIcon;