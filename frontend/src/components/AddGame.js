import React from "react";
import styled from "styled-components";

import {
    FormControl,
    FormInputLabel,
    FormTextInput,
    FormCheckbox,
    FormDropdown,
} from "./Form";
import { ErrorBar } from "./ErrorBar";
import { Button } from "./Button";
import { callApi } from "../util/callApi";

const AddGameBox = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
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
        callApi("/game", "post", this.state.form)
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
                <FormControl>
                    <FormInputLabel>App ID</FormInputLabel>
                    <FormTextInput
                        type="text"
                        name="appID"
                        value={this.state.form.appID}
                        placeholder="App ID on Steam"
                        onChange={this.handleOnAppIDChange}
                        readOnly={this.state.submitting}
                    />
                </FormControl>
                <FormControl>
                    <FormInputLabel>Title</FormInputLabel>
                    <FormTextInput
                        type="text"
                        name="title"
                        value={this.state.form.title}
                        onChange={this.handleInputChange}
                        readOnly={this.state.submitting}
                    />
                </FormControl>
                <FormControl>
                    <FormInputLabel>Release date</FormInputLabel>
                    <FormTextInput
                        type="text"
                        name="releaseDate"
                        value={this.state.form.releaseDate}
                        onChange={this.handleInputChange}
                        readOnly={this.state.submitting}
                    />
                </FormControl>
                <FormControl>
                    <FormInputLabel>In library</FormInputLabel>
                    <FormCheckbox name="inLibrary"
                        isChecked={this.state.form.inLibrary}
                        onChange={this.handleInputChange} />
                </FormControl>
                <FormControl>
                    <FormInputLabel>Status</FormInputLabel>
                    <FormDropdown
                        items={[
                            { value: "completed", label: "Completed" },
                            { value: "played", label: "Played" },
                            { value: "unplayed", label: "Unplayed" }
                        ]}
                        name="status"
                        value={this.state.form.status}
                        onChange={this.handleInputChange}
                        onSelect={this.handleOnStatusChange}
                    />
                </FormControl>
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
