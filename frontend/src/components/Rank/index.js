import React from "react";
import styled from "styled-components";

import { UserSession } from "../Session";
import AddRank from "./AddRank";
import Ranking from "./Ranking";

const RankPage = styled.div`
    flex: 1;
    margin: auto;
    max-width: 500px;
`;

class Rank extends React.Component {
    render() {
        return (
            <RankPage>
                <UserSession>
                    <AddRank />
                </UserSession>
                <Ranking />
            </RankPage>
        );
    }
}

export default Rank;
