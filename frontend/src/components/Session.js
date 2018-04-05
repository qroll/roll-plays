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
    render() {
        return this.props.isLoggedIn ? null : this.props.children;
    }
}

export const GuestSession = connect(mapStateToProps, mapDispatchToProps)(
    GuestSessionModule
);

class UserSessionModule extends Component {
    render() {
        return this.props.isLoggedIn ? (
            this.props.children
        ) : this.props.redirect ? (
            <Redirect to="/login" />
        ) : null;
    }
}

export const UserSession = connect(mapStateToProps, mapDispatchToProps)(
    UserSessionModule
);

class GuestOrUserSessionModule extends Component {
    render() {
        let { guestComponent, userComponent, isLoggedIn } = this.props;
        return isLoggedIn ? userComponent : guestComponent;
    }
}

export const GuestOrUserSession = connect(mapStateToProps)(
    GuestOrUserSessionModule
);

class SessionCheckerModule extends Component {
    componentDidMount() {
        this.props.actions.checkUserSession();
    }

    render() {
        return this.props.isCheckingSession ? null : this.props.children;
    }
}

export const SessionChecker = connect(mapStateToProps, mapDispatchToProps)(
    SessionCheckerModule
);
