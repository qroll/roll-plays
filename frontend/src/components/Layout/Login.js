import React from "react";

import { AppLink } from "../Common";

const StyledLink = AppLink.extend`
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

class Login extends React.Component {
    render() {
        return <StyledLink to="/login">Login</StyledLink>;
    }
}

export default Login;
