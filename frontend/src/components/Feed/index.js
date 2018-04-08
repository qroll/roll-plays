import React from "react";
import moment from "moment";
import styled from "styled-components";

import FeedBox from "./FeedBox";
import FeedList from "./FeedList";

const dummyPosts = [
    {
        _id: "3c",
        game: "The Sims",
        body:
            "rosebud;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!;!",
        edited: false,
        date: moment(),
        parent: "2b",
        prev: "2b",
        next: "4d"
    },
    {
        _id: "4d",
        game: "The Sims 4",
        body:
            "With ghosts, pools, apartments, toddlers and pets back, only Seasons is left as a franchise staple. Hopefully Maxis can explore new themes once it's done. (I'm not holding my breath)",
        edited: false,
        date: moment(),
        parent: "2b",
        prev: "3c",
        tags: ["DLC"]
    },
    {
        _id: "2b",
        game: "The Sims 2",
        body:
            "The Sims 4 is a major disappointment, but at least we still have The Sims 2 to return to~",
        edited: true,
        date: "2016-08-03",
        next: "3c"
    },
    {
        _id: "1a",
        game: "Cook, Serve, Delicious!",
        body:
            "A restaurant sim that's really a cross between Typing of the Dead and Cake Mania. It's way more fun than it has any right to be.",
        edited: false,
        date: "2016-01-03"
    }
];

const FeedPage = styled.div`
    flex: 1;
    margin: auto;
    max-width: 500px;
`;

class Feed extends React.Component {
    state = {
        post: "",
        posts: []
    };

    componentDidMount() {
        let posts = dummyPosts;
        this.setState({ posts });
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