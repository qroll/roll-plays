import React from "react";
import styled from "styled-components";

import { FormControl, Label, TextInput, Button, Error } from "./Form";

import { callApi } from "../util/callApi";

const AddRankBox = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 20px;
`;

const defaultFormFields = {
    name: "",
    description: ""
};

class AddRank extends React.Component {
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

    handleOnClick = () => {
        callApi("/rank", "post", this.state.form)
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
            <AddRankBox>
                {this.state.error && <Error>{this.state.error}</Error>}
                <FormControl>
                    <Label>Name</Label>
                    <TextInput
                        type="text"
                        name="name"
                        value={this.state.form.name}
                        onChange={this.handleInputChange}
                        readOnly={this.state.submitting}
                    />
                </FormControl>
                <FormControl>
                    <Label>Description</Label>
                    <TextInput
                        type="text"
                        name="description"
                        value={this.state.form.description}
                        onChange={this.handleInputChange}
                        readOnly={this.state.submitting}
                    />
                </FormControl>
                {this.state.submitting ? (
                    <Button disabled>Adding...</Button>
                ) : (
                    <Button onClick={this.handleOnClick}>Add</Button>
                )}
            </AddRankBox>
        );
    }
}

export default AddRank;
