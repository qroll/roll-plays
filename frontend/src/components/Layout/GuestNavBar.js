import React from "react";

import { NavBar, StyledLink } from "./NavBar";

class GuestNavBar extends React.Component {
    render() {
        return (
            <NavBar>
                <StyledLink to="/rank">Ranks</StyledLink>
                <StyledLink to="/game">Games</StyledLink>
                <StyledLink to="/feed">Feed</StyledLink>
            </NavBar>
        );
    }
}

export default GuestNavBar;
