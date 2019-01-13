import React from "react";

import Page from "src/components/Container/Page";
import { UserSession } from "../Session";
import AddRank from "./AddRank";
import RankList from "./RankList";

class Rank extends React.Component {
    render() {
        return (
            <Page>
                <UserSession>
                    <AddRank />
                </UserSession>
                <RankList />
            </Page>
        );
    }
}

export default Rank;
