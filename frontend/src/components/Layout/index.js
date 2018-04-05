import React from "react";

import { GuestOrUserSession } from "../Session";
import GuestLayout from "./GuestLayout";
import UserLayout from "./UserLayout";

import "../App.css";

class Layout extends React.Component {
    render() {
        return (
            <div className="App">
                <GuestOrUserSession
                    guestComponent={<GuestLayout />}
                    userComponent={<UserLayout />}
                />
                {this.props.children}
            </div>
        );
    }
}

export default Layout;
