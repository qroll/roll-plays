import React from "react";
import styled from "styled-components";

import { createGame } from "src/actions/game";

import { FormCheckbox, FormDropdown, FormTextField } from "src/components/Form";
import { ErrorBar } from "src/components/ErrorBar";
import { Button } from "src/components/Button";
import Card from "src/components/Container/Card";

const AddGameBox = styled(Card)`
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 20px;
`;

const defaultFormFields = {
    appID: "",
    title: "",
    releaseDate: "",
    inLibrary: false,
    status: ""
};

class AddGame extends React.Component {
    state = {
        submitting: false,
        error: false,
        form: defaultFormFields
    };

    handleOnAppIDChange = (name, input) => {
        // example url: http://store.steampowered.com/app/386620/Cook_Serve_Delicious_2/
        let urlRegex = /(?:^https?:\/\/)?(?:www)?store\.steampowered\.com\/app\/([0-9]+)(\/\.+)?/;
        let result = urlRegex.exec(input);

        let value = result ? result[1] : input;

        this.setState(prevState => {
            return {
                form: {
                    ...prevState.form,
                    appID: value
                }
            };
        });
    };

    handleInputChange = (name, value) => {
        this.setState(prevState => {
            return {
                form: { ...prevState.form, [name]: value }
            };
        });
    };

    handleOnStatusChange = (value, item) => {
        this.setState(state => ({
            form: { ...state.form, status: item.value }
        }));
    };

    handleOnClick = () => {
        createGame(this.state.form)
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
            <AddGameBox>
                {this.state.error && <ErrorBar>{this.state.error}</ErrorBar>}
                <FormTextField
                    label="App ID"
                    name="appID"
                    value={this.state.form.appID}
                    placeholder="Paste a link to the Steam store page"
                    onChange={this.handleOnAppIDChange}
                    readOnly={this.state.submitting}
                />
                <FormTextField
                    label="Title"
                    name="title"
                    value={this.state.form.title}
                    onChange={this.handleInputChange}
                    readOnly={this.state.submitting}
                />
                <FormTextField
                    label="Release date"
                    name="releaseDate"
                    value={this.state.form.releaseDate}
                    onChange={this.handleInputChange}
                    readOnly={this.state.submitting}
                />
                <FormCheckbox
                    label="In library"
                    name="inLibrary"
                    isChecked={this.state.form.inLibrary}
                    onChange={this.handleInputChange}
                />
                <FormDropdown
                    items={[
                        { value: "completed", label: "Completed" },
                        { value: "played", label: "Played" },
                        { value: "backlog", label: "Backlog" }
                    ]}
                    name="status"
                    value={this.state.form.status}
                    onChange={this.handleInputChange}
                    creatable
                />
                {this.state.submitting ? (
                    <Button disabled>Adding...</Button>
                ) : (
                        <Button onClick={this.handleOnClick}>Add</Button>
                    )}
            </AddGameBox>
        );
    }
}

export default AddGame;
