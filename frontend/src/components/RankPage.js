import React from "react";

import { UserSession } from "./Session";
import AddRank from "./AddRank";
import Ranking from "./Ranking";

class RankPage extends React.Component {
    render() {
        return (
            <div style={{ margin: "10px" }}>
                <UserSession>
                    <AddRank />
                </UserSession>
                <Ranking />
            </div>
        );
    }
}

export default RankPage;
