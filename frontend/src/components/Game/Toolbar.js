import React from "react";
import styled from "styled-components";

import Card from "src/components/Container/Card";
import { FONT_TITLE, ACCENT } from "src/components/styles";

const Wrapper = styled(Card)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;

    position: sticky;
    top: 0;
    right: 0;
`;

const TextButton = styled.span`
    cursor: pointer;
    font-family: ${FONT_TITLE};

    &:hover {
        color: ${ACCENT.PRIMARY};
    }
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
