import React from "react";
import { Link } from "react-router-dom";
import { UserSession, GuestSession } from "./Session";

import "./Layout.css";

const StyledLink = props => (
    <span className="nav-link">
        <Link {...props} style={{ textDecoration: "none" }}>
            {props.children}
        </Link>
    </span>
);

class UserLayout extends React.Component {
    render() {
        return (
            <div className="nav-bar">
                <StyledLink to="/account">Account</StyledLink>
                <StyledLink to="/rank">Rank</StyledLink>
                <StyledLink to="/sample">Sample</StyledLink>
            </div>
        );
    }
}

class GuestLayout extends React.Component {
    render() {
        return (
            <div className="nav-bar">
                <StyledLink to="/rank">Rank</StyledLink>
                <StyledLink to="/sample">Sample</StyledLink>
            </div>
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
