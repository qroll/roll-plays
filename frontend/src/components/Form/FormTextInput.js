import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TextInput = styled.input`
    background: none;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    box-sizing: border-box;
    flex: 1 auto;
    padding: 5px;
    outline: none;
    width: 100%;

    &::placeholder {
        color: #e0e0e0;
    }

    &:hover {
        border: none;
        border-bottom: 2px solid #ebebeb;
        margin-bottom: -1px;
    }

    &:focus {
        border: none;
        border-bottom: 2px solid #f07241;
        margin-bottom: -1px;
    }
`;

class FormTextInput extends React.Component {
    handleInputChange = e => {
        this.props.onChange(this.props.name, e.target.value);
    };

    render() {
        return (
            <TextInput value={this.props.value} onChange={this.handleInputChange} />
        );
    }
}

FormTextInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default FormTextInput;