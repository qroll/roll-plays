import React from "react";
import PropTypes from "prop-types";

import FormControl from './FormControl';
import Label from './Label';
import Checkbox from './Checkbox';
import Required from './Required';

class FormCheckbox extends React.Component {
  render() {
    let { name, label, isChecked, readOnly, required, onChange } = this.props;
    return (
      <FormControl>
        <Label htmlFor={`checkbox-${name}`}>{label}{required && <Required />}</Label>
        <Checkbox
          name={name}
          isChecked={isChecked}
          onChange={onChange}
          readOnly={readOnly}
        />
      </FormControl>
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