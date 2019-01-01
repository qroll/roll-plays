import styled from "styled-components";

import { GRAY } from "src/components/styles";

const ListItem = styled.div`
    padding: 15px;
    overflow-wrap: break-word;

    &:not(:last-of-type) {
        border-bottom: 1px solid ${GRAY.LIGHTER};
    }

    &:hover {
        background-color: ${GRAY.LIGHTEST};
    }
`;

export default ListItem;
