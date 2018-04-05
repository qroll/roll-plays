import React from "react";
import { Link } from "react-router-dom";
import { UserSession, GuestSession } from "./Session";
import styled from "styled-components";

const NavBar = styled.nav`
    background-color: #fdfdfd;
    border: 1px solid #ebebeb;
    border-bottom: 3px solid #ebebeb;
    display: flex;

    @media (min-width: 768px) {
        margin: 10px auto;
        max-width: 768px;
    }
`;

const StyledLink = styled(Link)`
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

class UserLayout extends React.Component {
    render() {
        return (
            <NavBar>
                <StyledLink to="/account">Account</StyledLink>
                <StyledLink to="/rank">Rank</StyledLink>
                <StyledLink to="/sample">Sample</StyledLink>
                <StyledLink to="/feed">Feed</StyledLink>
            </NavBar>
        );
    }
}

class GuestLayout extends React.Component {
    render() {
        return (
            <NavBar>
                <StyledLink to="/rank">Rank</StyledLink>
                <StyledLink to="/sample">Sample</StyledLink>
                <StyledLink to="/feed">Feed</StyledLink>
            </NavBar>
        );
    }
}

class Layout extends React.Component {
    render() {
        return (
            <div>
                <UserSession>
                    <UserLayout />
                </UserSession>
                <GuestSession>
                    <GuestLayout />
                </GuestSession>
                {this.props.children}
            </div>
        );
    }
}

export default Layout;
