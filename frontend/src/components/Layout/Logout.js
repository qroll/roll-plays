import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { ClearButton } from "src/components/Button";

import * as actions from "src/actions/user";

class Logout extends React.Component {
    render() {
        return (
            <ClearButton
                onClick={() => this.props.actions.logout()}
                style={this.props.style}
            >
                Logout
            </ClearButton>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const LogoutContainer = connect(
    null,
    mapDispatchToProps
)(Logout);

export default LogoutContainer;
