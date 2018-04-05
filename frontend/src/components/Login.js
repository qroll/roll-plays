import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { FormControl, Label, TextInput, Button, Error } from "./Form";

import * as actions from "../actions/user";

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
            <div>
                {this.state.error && <Error>{this.state.error}</Error>}
                <FormControl>
                    <Label>Username</Label>
                    <TextInput
                        type="text"
                        name="username"
                        value={this.state.form.username}
                        onChange={this.handleInputChange}
                        readOnly={this.state.submitting}
                    />
                </FormControl>
                <FormControl>
                    <Label>Password</Label>
                    <TextInput
                        type="text"
                        name="password"
                        value={this.state.form.password}
                        onChange={this.handleInputChange}
                        readOnly={this.state.submitting}
                    />
                </FormControl>
                {this.state.submitting ? (
                    <Button disabled>Logging in...</Button>
                ) : (
                    <Button onClick={this.handleOnSubmit}>Login</Button>
                )}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const LoginModule = connect(null, mapDispatchToProps)(Login);

export default LoginModule;
