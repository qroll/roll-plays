import React from "react";

import { AppLink } from "../Common";

const StyledLink = AppLink.extend`
    font-family: "Roboto Condensed";
    margin: 10px;
    padding: 10px;
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
