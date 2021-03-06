import React from "react";
import styled from "styled-components";

import { postToFeed } from "src/actions/feed";

import { Button } from "src/components/Button";
import Card from "src/components/Container/Card";
import { GRAY } from "src/components/styles";
import CustomTagInput from "./CustomTagInput";
import GameTagInput from "./GameTagInput";

const StyledFeedBox = styled(Card)`
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 10px;
`;

const PostButton = styled(Button)`
    align-self: flex-end;
`;

const TextArea = styled.input`
    background: none;
    border: none;
    font-family: "Roboto";
    font-size: 1rem;
    margin-bottom: 5px;
    outline: none;
    padding: 5px;
    width: calc(100% - 10px);

    &::placeholder {
        color: ${GRAY.LIGHT};
    }
`;

class FeedBox extends React.Component {
    state = {
        post: "",
        games: [],
        tags: [],
        submitting: false,
        error: false
    };

    handleOnGameChange = games => {
        this.setState({ games });
    };

    handleOnTagChange = tags => {
        this.setState({ tags });
    };

    handleOnPostChange = e => {
        this.setState({ post: e.target.value });
    };

    handleOnPostSubmit = e => {
        let form = {
            body: this.state.post,
            games: this.state.games,
            tags: this.state.tags
        };
        postToFeed(form)
            .then(res => {
                this.setState({
                    submitting: false,
                    error: false,
                    post: "",
                    games: [],
                    tags: []
                });
            })
            .catch(err => {
                this.setState({
                    submitting: false,
                    error: "Request failed. Try again."
                });
            });
    };

    render() {
        let { post, tags, games } = this.state;
        return (
            <StyledFeedBox>
                <TextArea
                    value={post}
                    placeholder="What's on your mind?"
                    onChange={this.handleOnPostChange}
                />
                <GameTagInput
                    selectedGames={games}
                    onGameChange={this.handleOnGameChange}
                />
                <CustomTagInput
                    tags={tags}
                    onTagChange={this.handleOnTagChange}
                />
                <PostButton onClick={this.handleOnPostSubmit}>Post</PostButton>
            </StyledFeedBox>
        );
    }
}

export default FeedBox;
