import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { NavBar, StyledLink, StyledNavText } from "./NavBar";

import * as actions from "../../actions/user";

class UserLayout extends React.Component {
    render() {
        return (
            <NavBar>
                <StyledLink to="/account">Account</StyledLink>
                <StyledLink to="/rank">Ranks</StyledLink>
                <StyledLink to="/game">Games</StyledLink>
                <StyledLink to="/feed">Feed</StyledLink>
                <StyledNavText onClick={() => this.props.actions.logout()}>
                    Logout
                </StyledNavText>
            </NavBar>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const UserLayoutContainer = connect(null, mapDispatchToProps)(UserLayout);

export default UserLayoutContainer;
