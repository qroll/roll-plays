import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { NavBar, StyledLink } from "./NavBar";

import * as actions from "../../actions/user";

class UserNavBar extends React.Component {
    render() {
        return (
            <NavBar>
                <StyledLink to="/account">Account</StyledLink>
                <StyledLink to="/rank">Ranks</StyledLink>
                <StyledLink to="/game">Games</StyledLink>
                <StyledLink to="/feed">Feed</StyledLink>
            </NavBar>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const UserNavBarContainer = connect(null, mapDispatchToProps)(UserNavBar);

export default UserNavBarContainer;
