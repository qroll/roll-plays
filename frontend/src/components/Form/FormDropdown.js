import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CreatableDropdown from "./CreatableDropdown";
import Dropdown from "./Dropdown";
import Label from "./Label";
import FormControl from "./FormControl";

class FormDropdown extends React.Component {
    render() {
        let { items, value, name, creatable, onChange } = this.props;
        let selectedItem = items.find(item => item.value === value);
        let displayLabel = selectedItem
            ? selectedItem.label
            : value;

        return (
            <FormControl>
                <Label htmlFor={`textfield-${name}`}>Status</Label>
                {creatable ?
                    <CreatableDropdown
                        items={items}
                        name={name}
                        value={value}
                        onChange={onChange}
                    />
                    :
                    <Dropdown
                        items={items}
                        name={name}
                        value={value}
                        onChange={onChange}
                    />
                }
            </FormControl>
        );
    }

}

FormDropdown.propTypes = {
    items: PropTypes.array,
    value: PropTypes.string,
    name: PropTypes.string,
    creatable: PropTypes.bool,
    onChange: PropTypes.func
};

export default FormDropdown;