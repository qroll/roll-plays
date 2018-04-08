import React from "react";
import styled from "styled-components";

import { GuestOrUserSession } from "../Session";
import GuestLayout from "./GuestLayout";
import UserLayout from "./UserLayout";

import "./Layout.css";

import bg from "./8370546654_cfced9bba0_o.jpg";

const Background = styled.img`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    object-fit: cover;
`;

const Attribution = styled.a`
    position: fixed;
    bottom: 0;
    right: 0;
    color: #333333;
    font-size: 0.8em;
    padding: 5px;
    text-decoration: none;
`;

class Layout extends React.Component {
    render() {
        return (
            <div className="App">
                <GuestOrUserSession
                    guestComponent={<GuestLayout />}
                    userComponent={<UserLayout />}
                />
                {this.props.children}
                <Background src={bg} />
                <Attribution href="https://www.flickr.com/photos/87896671@N04/8370546654/">
                    Stuart Williams
                </Attribution>
            </div>
        );
    }
}

export default Layout;
