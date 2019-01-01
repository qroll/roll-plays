import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { GRAY, ACCENT, WHITE } from "src/components/styles";

export const Checkbox = styled.div`
    background-color: ${props => (props.checked ? ACCENT.PRIMARY : WHITE)};
    border: 1px solid ${GRAY.LIGHTER};
    box-sizing: border-box;
    display: block;
    height: 1em;
    margin: 5px 0;
    outline: none;
    width: 1em;

    &:hover,
    &:focus {
        border: 2px solid ${GRAY.LIGHTER};
    }
`;

class FormCheckbox extends React.Component {
    handleInputChange = () => {
        this.props.onChange(this.props.name, !this.props.isChecked);
    };

    handleKey = e => {
        if (e.key === "Enter" || e.key === " ") {
            this.props.onChange(this.props.name, !this.props.isChecked);
        }
    };

    render() {
        return (
            <Checkbox
                id={`checkbox-${this.props.name}`}
                role="checkbox"
                aria-checked={this.props.isChecked}
                aria-labelledby={`label-${this.props.name}`}
                tabIndex={0}
                onKeyDown={this.handleKey}
                checked={this.props.isChecked}
                onClick={this.handleInputChange}
            />
        );
    }
}

FormCheckbox.propTypes = {
    isChecked: PropTypes.bool,
    onChange: PropTypes.func
};

FormCheckbox.defaultProps = {
    isChecked: false
};

export default FormCheckbox;
