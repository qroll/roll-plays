import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../actions/user";

const mapStateToProps = state => {
    return {
        isCheckingSession: state.user.isCheckingSession,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

class GuestSessionModule extends Component {
    componentDidMount() {
        this.props.actions.checkUserSession();
    }

    render() {
        return (
            <div>
                {this.props.isCheckingSession
                    ? this.props.children
                    : this.props.isLoggedIn ? null : this.props.children}
            </div>
        );
    }
}

export const GuestSession = connect(mapStateToProps, mapDispatchToProps)(
    GuestSessionModule
);

class UserSessionModule extends Component {
    componentDidMount() {
        this.props.actions.checkUserSession();
    }

    render() {
        return (
            <div>
                {this.props.isCheckingSession ? null : this.props.isLoggedIn ? (
                    this.props.children
                ) : this.props.redirect ? (
                    <Redirect to="/sample" />
                ) : null}
            </div>
        );
    }
}

export const UserSession = connect(mapStateToProps, mapDispatchToProps)(
    UserSessionModule
);
