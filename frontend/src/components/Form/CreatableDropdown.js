import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Autocomplete from "react-autocomplete";

import { Input } from "./TextInput";

class Dropdown extends React.Component {
    handleOnChange = (e, value) => {
        this.props.onChange(this.props.name, value);
    };

    handleOnSelect = (value, item) => {
        this.props.onChange(this.props.name, value);
    }

    render() {
        let { items, value, name } = this.props;
        let selectedItem = items.find(item => item.value === value);
        let displayLabel = selectedItem
            ? selectedItem.label
            : value;

        return (
            <Autocomplete
                getItemValue={item => item.value}
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
                inputProps={{ value: displayLabel, name: this.props.name, onChange: this.handleInputChange }}
                renderInput={props => {
                    const { ref, name, ...rest } = props;
                    return (<Input
                        {...rest}
                        innerRef={ref}
                        id={`textfield-${name}`}
                    />);
                }}
                wrapperStyle={{
                    flex: "1 auto",
                }}
                menuStyle={{
                    borderRadius: '3px',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '2px 0',
                    fontSize: '90%',
                    position: 'fixed',
                    overflow: 'auto',
                    maxHeight: '50%',
                    marginTop: '3px'
                }}
                value={displayLabel}
                name={name}
                onChange={this.handleOnChange}
                onSelect={this.handleOnSelect}
                items={items}
            />
        );
    }

}

Dropdown.propTypes = {
    items: PropTypes.array,
    value: PropTypes.string,
    name: PropTypes.string
};

export default Dropdown;