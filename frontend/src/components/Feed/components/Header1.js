import React from "react";
import styled from "styled-components";

const StyledHeader1 = styled.div`
    line-height: 2.5rem;
    font-size: 2.5rem;
    font-weight: bold;
`;

const Header1 = ({ content, innerRef, ...props }) => {
    return (
        <div>
            <StyledHeader1 {...props} innerRef={innerRef}>
                {content}
            </StyledHeader1>
        </div>
    );
};

export default Header1;
