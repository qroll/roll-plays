import React from "react";
import PropTypes from "prop-types";

import FormControl from './FormControl';
import Label from './Label';
import FormTextInput from './TextInput';
import Required from "./Required";

class FormTextField extends React.Component {
    render() {
        let { name, label, value, placeholder, readOnly, required, onChange } = this.props;
        return (
            <FormControl>
                <Label htmlFor={`textfield-${name}`}>{label}{required && <Required />}</Label>
                <FormTextInput
                    type="text"
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    readOnly={readOnly}
                />
            </FormControl>
        );
    }
}

FormTextField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    required: PropTypes.bool
}

export default FormTextField;