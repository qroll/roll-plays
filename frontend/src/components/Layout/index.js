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
    height: 100vh;
    width: 100%;
    z-index: -1;
    object-fit: cover;
`;

const Attribution = styled(ALink)`
    color: #333333;
    font-size: 0.8em;
    padding: 5px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 768px) {
        display: flex;
        flex-direction: row;
    }
`;

const LeftSection = styled.div`
    flex: 1;
`;

const RightSection = styled.div`
    flex: 1;
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

class NavHeader extends React.Component {
    render() {
        return (
            <Header>
                <LeftSection />
                <GuestOrUserSession
                    guestComponent={<GuestNavBar />}
                    userComponent={<UserNavBar />}
                />
                <RightSection>
                    <GuestOrUserSession
                        guestComponent={<Login />}
                        userComponent={<Logout />}
                    />
                </RightSection>
            </Header>
        );
    }
}

class Layout extends React.Component {
    render() {
        return (
            <div className="App">
                <NavHeader />
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
