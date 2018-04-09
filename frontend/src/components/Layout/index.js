import React from "react";
import styled from "styled-components";

import { GuestOrUserSession } from "../Session";
import { ALink } from "../Common";
import GuestNavBar from "./GuestNavBar";
import UserNavBar from "./UserNavBar";
import Logout from "./Logout";
import Login from "./Login";

import "./Layout.css";

import large from "./paintshot-2764w-min.jpg";
import med from "./paintshot-2048w-min.jpg";
import small from "./paintshot-640w-min.jpg";

const Background = styled.img`
    position: fixed;
    top: 0;
    left: 0;
    height: 120vh;
    width: 100%;
    z-index: -1;
    object-fit: cover;
`;

const Attribution = ALink.extend`
    color: #333333;
    font-size: 0.8em;
    padding: 5px;
`;

class Layout extends React.Component {
    render() {
        return (
            <div className="App">
                <GuestOrUserSession
                    guestComponent={<GuestNavBar />}
                    userComponent={<UserNavBar />}
                />
                <GuestOrUserSession
                    guestComponent={<Login />}
                    userComponent={<Logout />}
                />
                {this.props.children}
                <Background
                    src={large}
                    srcset={`${small} 640w, ${med} 2048w, ${large} 2768w`}
                />
                <Attribution href="https://www.flickr.com/photos/87896671@N04/8370546654/">
                    Stuart Williams
                </Attribution>
            </div>
        );
    }
}

export default Layout;
