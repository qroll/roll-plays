import React from "react";
import moment from "moment";
import styled from "styled-components";

import { callApi } from "src/utils/callApi";

import FeedBox from "./FeedBox";
import FeedList from "./FeedList";

const FeedPage = styled.div`
    flex: 1;
    margin: 0 10px 10px;
    width: calc(100% - 20px);

    @media (min-width: 420px) {
        margin: 0 auto 10px auto;
        max-width: 500px;
    }
`;

class Feed extends React.Component {
    state = {
        post: "",
        posts: []
    };

    componentDidMount() {
        callApi("/post").then(res => {
            let { data } = res.data;
            this.setState({ posts: data });
        });
    }

    handleOnPostChange = e => {
        console.log(e, "????");
        //this.setState({ post: e.target.value });
    };

    handleOnPostSubmit = () => {
        this.setState({ post: "" });
    };

    render() {
        return (
            <FeedPage>
                <FeedBox
                    post={this.state.post}
                    handleOnPostChange={this.handleOnPostChange}
                    handleOnPostSubmit={this.handleOnPostSubmit}
                />
                <FeedList posts={this.state.posts} />
            </FeedPage>
        );
    }
}

export default Feed;
