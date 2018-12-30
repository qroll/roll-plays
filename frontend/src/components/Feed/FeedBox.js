import React from "react";
import styled from "styled-components";

import { Button } from "src/components/Button";
import { GRAY } from "src/components/styles";
import CustomTagInput from "./CustomTagInput";
import GameTagInput from "./GameTagInput";

const StyledFeedBox = styled.div`
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    margin: 10px;
    outline: none;
    padding: 10px;
`;

const PostButton = Button.extend`
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
        tags: []
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
        this.setState({ post: "", tags: [] });
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
