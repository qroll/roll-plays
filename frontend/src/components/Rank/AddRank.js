import React from "react";
import styled from "styled-components";

import { createRank } from "src/actions/rank";

import { FormTextField } from "src/components/Form";
import { ErrorBar } from "src/components/ErrorBar";
import { Button } from "src/components/Button";
import Card from "src/components/Container/Card";

const AddRankBox = styled(Card)`
    display: flex;
    flex-direction: column;
    margin: 20px;
    max-width: 500px;
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

    handleInputChange = (name, value) => {
        this.setState(prevState => {
            return {
                form: { ...prevState.form, [name]: value }
            };
        });
    };

    handleOnClick = () => {
        createRank(this.state.form)
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
                {this.state.error && <ErrorBar>{this.state.error}</ErrorBar>}
                <FormTextField
                    label="Name"
                    name="name"
                    value={this.state.form.name}
                    onChange={this.handleInputChange}
                    readOnly={this.state.submitting}
                />
                <FormTextField
                    label="Description"
                    name="description"
                    value={this.state.form.description}
                    onChange={this.handleInputChange}
                    readOnly={this.state.submitting}
                />
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
