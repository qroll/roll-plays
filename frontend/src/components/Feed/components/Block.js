import styled from "styled-components";

const Block = styled.div`
    white-space: pre;
    border: 1px solid #f00;
    padding: 0;
    line-height: 1rem;
    min-height: 1rem;
    display: ${props => (props.inline ? "inline" : "block")};
`;

export default Block;
