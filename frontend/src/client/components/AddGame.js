import React from "react";
import styled from "styled-components";

import {
    FormControl,
    Label,
    TextInput,
    Checkbox,
    Toggle,
    Button,
    AutocompleteInput
} from "./Form";

const AddGameBox = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 20px;
`;

class AddGame extends React.Component {
    state = {
        appID: "",
        title: "",
        description: "",
        releaseDate: "",
        inLibrary: "",
        purchasePrice: "",
        bundleName: "",
        status: "",
        rating: "",
        bundleField: false
    };

    handleOnAppIDChange = e => {
        let input = e.target.value;
        // http://store.steampowered.com/app/386620/Cook_Serve_Delicious_2/
        let urlRegex = /(?:^http:\/\/)?store\.steampowered\.com\/app\/([0-9]+)(\/\.+)?/;
        let result = urlRegex.exec(input);

        if (result) {
            this.setState({ appID: result[1] });
        } else {
            this.setState({ appID: input });
        }
    };

    handleInputChange = e => {
        if (e.target.type === "checkbox") {
            this.setState({ [e.target.name]: e.target.checked });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    };

    handleOnClick = () => {
        console.log("whoo");
        this.setState({ game: "" });
    };

    toggleBundleField = () => {
        this.setState(prevState => {
            return { bundleField: !prevState.bundleField };
        });
    };

    render() {
        return (
            <AddGameBox>
                <FormControl>
                    <Label>App ID</Label>
                    <TextInput
                        type="text"
                        name="appID"
                        value={this.state.appID}
                        placeholder="App ID on Steam"
                        onChange={this.handleOnAppIDChange}
                    />
                </FormControl>
                <FormControl>
                    <Label>Title</Label>
                    <TextInput
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <Label>Description</Label>
                    <TextInput
                        type="text"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <Label>Release date</Label>
                    <TextInput
                        type="text"
                        name="releaseDate"
                        value={this.state.releaseDate}
                        onChange={this.handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <Toggle>
                        <Checkbox
                            type="checkbox"
                            name="inLibrary"
                            checked={this.state.inLibrary}
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
                            value={this.state.purchasePrice}
                            onChange={this.handleInputChange}
                        />
                    </FormControl>
                )}
                <FormControl>
                    <Toggle>
                        <Checkbox
                            type="checkbox"
                            name="isFromBundle"
                            checked={this.state.isFromBundle}
                            onChange={this.toggleBundleField}
                        />
                        <Label>In bundle</Label>
                    </Toggle>
                </FormControl>
                {this.state.bundleField && (
                    <FormControl>
                        <Label>Bundle name</Label>
                        <AutocompleteInput
                            shouldItemRender={(item, value) =>
                                item.label
                                    .toLowerCase()
                                    .indexOf(value.toLowerCase()) > -1
                            }
                            getItemValue={item => item.label}
                            items={[
                                { id: "1", label: "apple" },
                                { id: "2", label: "banana" },
                                { id: "3", label: "pear" }
                            ]}
                            value={this.state.bundleName}
                            onChange={e =>
                                this.setState({ bundleName: e.target.value })
                            }
                            onSelect={value =>
                                this.setState({ bundleName: value })
                            }
                        />
                    </FormControl>
                )}
                <FormControl>
                    <Label>Status</Label>
                    <TextInput
                        type="text"
                        name="status"
                        value={this.state.status}
                        onChange={this.handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <Label>Rating</Label>
                    <TextInput
                        type="text"
                        name="rating"
                        value={this.state.rating}
                        onChange={this.handleInputChange}
                    />
                </FormControl>
                <Button onClick={this.handleOnClick}>Add</Button>
            </AddGameBox>
        );
    }
}

export default AddGame;
