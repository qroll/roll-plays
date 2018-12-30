import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const Checkbox = styled.div`
  background-color: ${props => props.checked ? "#f07241" : "#ffffff"};
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  content: "";
  display: block;
  height: 1em;
  margin: 5px 0;
  outline: none;
  width: 1em;

  &:hover, &:focus {
    border: 2px solid #ebebeb;
  }
`;

class FormCheckbox extends React.Component {
  handleInputChange = () => {
    this.props.onChange(this.props.name, !this.props.isChecked);
  };

  handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      this.props.onChange(this.props.name, !this.props.isChecked);
    }
  }

  render() {
    return (
      <Checkbox
        id={`checkbox-${this.props.name}`}
        role="checkbox"
        aria-checked={this.props.isChecked}
        aria-labelledby={`label-${this.props.name}`}
        tabIndex={0}
        onKeyDown={this.handleKey}
        checked={this.props.isChecked} onClick={this.handleInputChange} />
    )
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