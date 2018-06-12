import React from "react";

import { AppLink } from "../Common";

const StyledLink = AppLink.extend`
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    color: #fff;
    font-family: "Roboto Condensed";
    padding: 10px 15px;
`;

class Login extends React.Component {
    render() {
        return <StyledLink to="/login">Login</StyledLink>;
    }
}

export default Login;
