import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { GRAY, ACCENT } from "src/components/styles";

export const Input = styled.input`
    background: none;
    border: none;
    border-bottom: 1px solid ${GRAY.LIGHTER};
    box-sizing: border-box;
    flex: 1 auto;
    font-family: "Roboto";
    font-size: 1rem;
    padding: 5px;
    outline: none;
    width: 100%;

    &::placeholder {
        color: ${GRAY.LIGHTER};
    }

    &:hover {
        border: none;
        border-bottom: 2px solid ${GRAY.LIGHTER};
        margin-bottom: -1px;
    }

    &:focus {
        border: none;
        border-bottom: 2px solid ${ACCENT.PRIMARY};
        margin-bottom: -1px;
    }
`;

class TextInput extends React.Component {
    handleInputChange = e => {
        this.props.onChange(this.props.name, e.target.value);
    };

    render() {
        let { name, value, placeholder, readOnly } = this.props;
        return (
            <Input
                type="text"
                id={`textfield-${name}`}
                value={value}
                placeholder={placeholder}
                onChange={this.handleInputChange}
                readOnly={readOnly}
            />
        );
    }
}

TextInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool
};

export default TextInput;
