import React from "react";
import styled from "styled-components";

import Card from "src/components/Container/Card";
import { TextButton } from "src/components/Button";

const Wrapper = styled(Card)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;

    position: sticky;
    top: 0;
    right: 0;
`;

export const Toolbar = props => {
    let {
        massEditMode = false,
        onEdit = () => {},
        onSave = () => {},
        onCancel = () => {}
    } = props;
    return (
        <Wrapper style={{ margin: "20px 10px" }}>
            {massEditMode ? (
                <React.Fragment>
                    <TextButton onClick={onSave}>Save</TextButton>
                    <TextButton onClick={onCancel}>Cancel</TextButton>
                </React.Fragment>
            ) : (
                <TextButton onClick={onEdit}>Edit All</TextButton>
            )}
        </Wrapper>
    );
};
