import React from "react";
import styled from "styled-components";

import { FormCheckbox, FormDropdown, FormTextField } from "./Form";
import { ErrorBar } from "./ErrorBar";
import { Button } from "./Button";
import { callApi } from "src/utils/callApi";

const AddGameBox = styled.div`
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
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
