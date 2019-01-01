import styled from "styled-components";
import { Link } from "react-router-dom";

import { GRAY, WHITE, ACCENT } from "src/components/styles";

export const NavBar = styled.nav`
    background-color: ${WHITE};
    border: 1px solid ${GRAY.LIGHTER};
    border-bottom: 3px solid ${GRAY.LIGHTER};
    display: flex;
    flex: 0 0 auto;
    margin: 10px auto;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: #333333;
    font-family: "Roboto Condensed";
    padding: 10px 10px 7px 10px;

    &:hover {
        border-bottom: 3px solid ${ACCENT.PRIMARY_MUTED};
        margin-bottom: -3px;
    }

    &:active {
        color: ${ACCENT.PRIMARY_MUTED};
    }
`;

export const StyledNavText = styled(StyledLink.withComponent("span"))`
    cursor: pointer;
`;
