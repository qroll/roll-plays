import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Autocomplete from "react-autocomplete";

import FormTextInput from "./FormTextInput";

/*
const renderInput = props => {
    const { ref, onChange, ...rest } = props;
    return creatable ? (
        <FormTextInput
            {...rest}
            name={name}
            innerRef={ref}
            value={displayLabel}
            onChange={onChange}
        />
    ) : (
            <FormTextInput
                {...rest}
                innerRef={ref}
                value={displayLabel}
                readOnly
            />
        );
}
*/

class Select extends React.Component {
    handleInputChange = (name, value) => {
        this.props.onChange(this.props.name, value);
    };

    render() {
        let { items, value, creatable, name } = this.props;
        let selectedItem = items.find(item => item.value === value);
        let displayLabel = selectedItem
            ? selectedItem.label
            : creatable ? value : "";

        return (
            <Autocomplete
                getItemValue={item => item.label}
                renderItem={(item, isHighlighted) => (
                    <div
                        key={item.value}
                        style={{
                            backgroundColor: isHighlighted ? "#e0e0e0" : "#ffffff",
                            padding: "3px",
                            fontSize: "1em"
                        }}
                    >
                        {item.label}
                    </div>
                )}
                renderInput={props => {
                    const { ref, onChange, ...rest } = props;
                    return creatable ? (
                        <FormTextInput
                            {...rest}
                            name={name}
                            innerRef={ref}
                            value={displayLabel}
                            onChange={this.handleInputChange}
                        />
                    ) : (
                            <FormTextInput
                                {...rest}
                                innerRef={ref}
                                value={displayLabel}
                                readOnly
                            />
                        );
                }}
                wrapperStyle={{
                    flex: "1 auto"
                }}
                {...this.props}
            />
        );
    }

}

Select.propTypes = {
    items: PropTypes.array,
    value: PropTypes.string,
    creatable: PropTypes.bool,
    name: PropTypes.string
};

export default Select;