import React from "react";

import Page from "src/components/Container/Page";
import { UserSession } from "../Session";
import AddRank from "./AddRank";
import Ranking from "./Ranking";

class Rank extends React.Component {
    render() {
        return (
            <Page>
                <UserSession>
                    <AddRank />
                </UserSession>
                <Ranking />
            </Page>
        );
    }
}

export default Rank;
