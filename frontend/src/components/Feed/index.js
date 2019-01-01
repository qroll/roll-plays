import React from "react";

import Page from "src/components/Container/Page";
import FeedBox from "./FeedBox";
import FeedList from "./FeedList";

class Feed extends React.Component {
    render() {
        return (
            <Page>
                <FeedBox />
                <FeedList />
            </Page>
        );
    }
}

export default Feed;
