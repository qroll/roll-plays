import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { TextLink } from "../Common";

import * as actions from "../../actions/user";

const StyledLink = TextLink.extend`
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    color: #fff;
    font-family: "Roboto Condensed";
    margin: 10px;
    padding: 10px 15px;
    position: absolute;
    right: 0;
    top: 0;
`;

class Logout extends React.Component {
    render() {
        return (
            <StyledLink onClick={() => this.props.actions.logout()}>
                Logout
            </StyledLink>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const LogoutContainer = connect(null, mapDispatchToProps)(Logout);

export default LogoutContainer;
