import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { getContrastColor } from "src/utils/color";
import { displayTime } from "src/utils/time";
import { callApi } from "src/utils/callApi";

import List from "src/components/Container/List";
import ListItem from "src/components/Container/ListItem";
import { WHITE, ACCENT } from "src/components/styles";

const StyledFeedList = styled(List)`
    margin: 10px;
`;

const PostBox = styled(ListItem)`
    padding: 15px;
    overflow-wrap: break-word;

    &:hover {
        background-color: ${WHITE};
    }
`;

const PostBody = styled.div`
    cursor: default;
    padding-bottom: 10px;

    p {
        margin: 15px 0;
    }

    p:first-child {
        margin-top: 0;
    }

    p:last-child {
        margin-bottom: 0;
    }
`;

const PostFooter = styled.div`
    align-items: flex-end;
    display: flex;
`;

const PostDate = styled.div`
    font-size: 0.8em;
    display: inline-block;
`;

const Tag = styled.span`
    background-color: ${props => props.color || ACCENT.SECONDARY};
    border-radius: 3px;
    color: ${props => getContrastColor(props.color || ACCENT.SECONDARY)};
    cursor: default;
    font-size: 0.75em;
    margin-right: 5px;
    padding: 3px 5px;
`;

const PostTags = ({ games = [], tags = [] }) => {
    return (
        <div style={{ paddingBottom: "10px" }}>
            {games.map(game => (
                <Tag key={game.title} color={ACCENT.PRIMARY}>
                    {game.title}
                </Tag>
            ))}
            {tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
            ))}
        </div>
    );
};

const Post = ({ post }) => (
    <PostBox>
        <PostBody>{post.body}</PostBody>
        <PostTags games={post.games} tags={post.tags} />
        <PostFooter>
            <Link to="/">
                <PostDate>{displayTime(post.date)}</PostDate>
            </Link>
        </PostFooter>
    </PostBox>
);

class FeedList extends React.Component {
    state = {
        posts: []
    };

    componentDidMount() {
        callApi("/post").then(res => {
            let { data } = res.data;
            this.setState({ posts: data });
        });
    }

    render() {
        let { posts } = this.state;
        return (
            <StyledFeedList>
                {posts.map(post => (
                    <Post key={post._id} post={post} />
                ))}
            </StyledFeedList>
        );
    }
}

export default FeedList;
