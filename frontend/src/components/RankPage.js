import React from "react";

import { UserSession, GuestSession } from "./Session";
import AddRank from "./AddRank";
import Ranking from "./Ranking";

class RankPage extends React.Component {
    render() {
        return (
            <div>
                <UserSession>
                    <AddRank />
                </UserSession>
                <Ranking />
            </div>
        );
    }
}

export default RankPage;
