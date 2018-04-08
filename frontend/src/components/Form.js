import React from "react";
import Autocomplete from "react-autocomplete";
import styled from "styled-components";

export const FormControl = styled.label`
    align-items: left;
    display: flex;
    flex-direction: column;
    margin: 5px;

    @media (min-width: 768px) {
        align-items: center;
        flex-direction: row;
        position: relative;
    }
`;

export const Label = styled.span`
    flex: 1 auto;
    font-family: "Roboto Condensed";
    font-size: 0.9em;
    padding: 5px 0;

    @media (min-width: 768px) {
        box-sizing: border-box;
        flex: 0 auto;
        padding: 0 10px 0 0;
        text-align: right;
        width: 16%;
    }
`;

export const TextInput = styled.input`
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

    ${Label}:hover > &, &:hover {
        border: none;
        border-bottom: 2px solid #ebebeb;
        margin-bottom: -1px;
    }

    &:focus {
        border: none;
        border-bottom: 2px solid #f07241;
        margin-bottom: -1px;
    }

    @media (min-width: 768px) {
        flex: 1 0px;
    }
`;

export const Checkbox = styled.input`
    margin: 0;
    opacity: 0;
    order: 1;
`;

export const Toggle = styled.div`
    display: flex;
    width: 100%;

    > ${Checkbox} + ${Label} {
        order: 0; /* force label to appear before checkbox */

        &:after {
            box-sizing: border-box;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            content: "";
            display: block;
            height: 1em;
            margin: 5px 0;
            width: 1em;
        }

        &:hover::after {
            border: 2px solid #ebebeb;
        }

        @media (min-width: 768px) {
            &::after {
                display: inline;
                margin: 0;
                position: absolute;
                left: 16%;
            }
        }
    }

    > ${Checkbox}:checked + ${Label} {
        &:after {
            background-color: #f07241;
        }
    }

    @media (min-width: 768px) {
        > ${Checkbox} + ${Label} {
            &:after {
                display: inline;
                margin: 0;
                position: absolute;
                left: 16%;
            }
        }
    }
`;

export const Button = styled.button`
    align-self: center;
    border: 1px solid #e0e0e0;
    background-color: #ebebeb;
    color: #333333;
    flex: 0 0 auto;
    outline: none;
    padding: 5px 10px;
    width: fit-content;

    &:hover {
        background-color: #e0e0e0;
    }
`;

export const Select = props => {
    let { items, value, creatable, name } = props;
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
                    <TextInput
                        {...rest}
                        name={name}
                        innerRef={ref}
                        value={displayLabel}
                        onChange={onChange}
                    />
                ) : (
                    <TextInput
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
            menuStyle={{
                border: "1px solid #ebebeb",
                minWidth: "unset",
                zIndex: 1
            }}
            {...props}
        />
    );
};

export const Error = styled.div`
    background-color: rgba(206, 17, 38, 0.05);
    border-radius: 5px;
    font-size: 0.75em;
    padding: 5px;
`;
