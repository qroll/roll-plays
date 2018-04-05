import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavBar = styled.nav`
    background-color: #fdfdfd;
    border: 1px solid #ebebeb;
    border-bottom: 3px solid #ebebeb;
    display: flex;

    @media (min-width: 768px) {
        margin: 10px auto;
        max-width: 768px;
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: #333333;
    font-family: "Roboto Condensed";
    padding: 10px 10px 7px 10px;

    &:hover {
        border-bottom: 3px solid #f07241;
        margin-bottom: -3px;
    }

    &:active {
        color: #f07241;
    }
`;

export const StyledNavText = StyledLink.withComponent("span").extend`
    cursor: pointer
`;
