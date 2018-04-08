import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";

import { Button } from "./Form";

import * as actions from "../actions/user";

const LoginPage = styled.div`
    display: flex;
    flex: 1;
`;

const LoginBox = styled.div`
    background-color: rgb(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    width: fit-content;
`;

const LoginInput = styled.input`
    background-color: rgb(0, 0, 0, 0.1);
    border: none;
    border-radius: 3px;
    box-sizing: border-box;
    color: #fff;
    flex: 1 auto;
    margin: 20px 20px 0 20px;
    padding: 10px;
    outline: none;
    width: 300px;

    &::placeholder {
        color: #efefef;
    }
`;

const LoginButton = Button.extend`
    border-radius: 3px;
    font-size: 0.9em;
    margin: 20px;
    padding: 10px;
    width: 300px;
`;

const Error = styled.div`
    background-color: rgba(206, 17, 38, 0.5);
    color: #efefef;
    font-size: 0.75em;
    padding: 5px;
`;

const defaultFormFields = {
    username: "",
    password: ""
};

class Login extends React.Component {
    state = {
        submitting: false,
        error: false,
        form: defaultFormFields
    };

    handleInputChange = e => {
        e.persist();
        this.setState(prevState => {
            return {
                form: { ...prevState.form, [e.target.name]: e.target.value }
            };
        });
    };

    handleOnSubmit = () => {
        let { username, password } = this.state.form;
        this.props.actions
            .login(username, password)
            .then()
            .then(res => {
                this.setState({
                    submitting: false,
                    error: false,
                    form: defaultFormFields
                });
            })
            .catch(err => {
                this.setState({
                    submitting: false,
                    error: "Request failed. Try again."
                });
            });
        this.setState({ submitting: true, error: false });
    };

    render() {
        return (
            <LoginPage>
                <LoginBox>
                    {this.state.error && <Error>{this.state.error}</Error>}
                    <LoginInput
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.form.username}
                        onChange={this.handleInputChange}
                        readOnly={this.state.submitting}
                    />
                    <LoginInput
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={this.state.form.password}
                        onChange={this.handleInputChange}
                        readOnly={this.state.submitting}
                    />
                    {this.state.submitting ? (
                        <LoginButton disabled>Logging in...</LoginButton>
                    ) : (
                        <LoginButton onClick={this.handleOnSubmit}>
                            Login
                        </LoginButton>
                    )}
                </LoginBox>
            </LoginPage>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const LoginModule = connect(null, mapDispatchToProps)(Login);

export default LoginModule;
