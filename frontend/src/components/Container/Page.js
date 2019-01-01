import styled from "styled-components";

const Page = styled.div`
    flex: 1;
    margin: 10px;
    width: calc(100% - 20px);

    @media (min-width: 420px) {
        margin: 10px auto;
        max-width: 500px;
    }
`;

export default Page;
