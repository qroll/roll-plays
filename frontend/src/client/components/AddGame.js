import React from "react";
import styled from "styled-components";

import {
    FormControl,
    Label,
    TextInput,
    Checkbox,
    Toggle,
    Button,
    Select,
    Error
} from "./Form";

import { callApi } from "../util/callApi";

const AddGameBox = styled.div`
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
    purchasePrice: "",
    inBundle: "",
    status: "",
    rating: ""
};

class AddGame extends React.Component {
    state = {
        submitting: false,
        error: false,
        form: defaultFormFields
    };

    handleOnAppIDChange = e => {
        let input = e.target.value;
        // example url: http://store.steampowered.com/app/386620/Cook_Serve_Delicious_2/
        let urlRegex = /(?:^http:\/\/)?store\.steampowered\.com\/app\/([0-9]+)(\/\.+)?/;
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

    handleInputChange = e => {
        e.persist();

        if (e.target.type === "checkbox") {
            this.setState(prevState => {
                return {
                    form: {
                        ...prevState.form,
                        [e.target.name]: e.target.checked
                    }
                };
            });
        } else {
            this.setState(prevState => {
                return {
                    form: { ...prevState.form, [e.target.name]: e.target.value }
                };
            });
        }
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
                {this.state.error && <Error>{this.state.error}</Error>}
                <FormControl>
                    <Label>App ID</Label>
                    <TextInput
                        type="text"
                        name="appID"
                        value={this.state.form.appID}
                        placeholder="App ID on Steam"
                        onChange={this.handleOnAppIDChange}
                        readOnly={this.state.submitting}
                    />
                </FormControl>
                <FormControl>
                    <Label>Title</Label>
                    <TextInput
                        type="text"
                        name="title"
                        value={this.state.form.title}
                        onChange={this.handleInputChange}
                        readOnly={this.state.submitting}
                    />
                </FormControl>
                <FormControl>
                    <Label>Release date</Label>
                    <TextInput
                        type="text"
                        name="releaseDate"
                        value={this.state.form.releaseDate}
                        onChange={this.handleInputChange}
                        readOnly={this.state.submitting}
                    />
                </FormControl>
                <FormControl>
                    <Toggle>
                        <Checkbox
                            type="checkbox"
                            name="inLibrary"
                            checked={this.state.form.inLibrary}
                            onChange={this.handleInputChange}
                        />
                        <Label>In library</Label>
                    </Toggle>
                </FormControl>
                {this.state.inLibrary && (
                    <FormControl>
                        <Label>Purchase price</Label>
                        <TextInput
                            type="text"
                            name="purchasePrice"
                            value={this.state.form.purchasePrice}
                            onChange={this.handleInputChange}
                            readOnly={this.state.submitting}
                        />
                    </FormControl>
                )}
                <FormControl>
                    <Toggle>
                        <Checkbox
                            type="checkbox"
                            name="inBundle"
                            checked={this.state.form.inBundle}
                            onChange={this.handleInputChange}
                        />
                        <Label>In bundle</Label>
                    </Toggle>
                </FormControl>
                <FormControl>
                    <Label>Status</Label>
                    <Select
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
                <FormControl>
                    <Label>Rating</Label>
                    <TextInput
                        type="text"
                        name="rating"
                        value={this.state.form.rating}
                        onChange={this.handleInputChange}
                        readOnly={this.state.submitting}
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
