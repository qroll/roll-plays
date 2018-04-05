import React from "react";
import moment from "moment";
import styled from "styled-components";
import { Link } from "react-router-dom";
import markdown from "markdown-it";

import { getContrastColor } from "../util/color";
import { displayTime } from "../util/time";

import icons from "./icons.svg";

const md = markdown();

const ThreadBox = styled.div`
    &:hover {
        background-color: #ebebeb;
    }

    &:not(:last-of-type) {
        border-bottom: 1px solid #e0e0e0;
    }
`;

const PostBox = styled.div`
    padding: 10px;

    &:not(:last-of-type) {
        border-bottom: 1px solid #fff;
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

const StyledFeedList = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    margin: 10px;
`;

const StyledSVG = styled.svg`
    fill: #333;
    height: 20px;
    width: 20px;
    margin-right: 4px;

    &:hover {
        fill: #e0e0e0;
    }
`;

const Tag = styled.span`
    background-color: ${props => props.color || "#33516E"};
    border-radius: 3px;
    color: ${props => getContrastColor(props.color || "#33516E")};
    cursor: default;
    font-size: 0.75em;
    margin-right: 5px;
    padding: 3px 5px;

    &:hover {
        background-color: ${props => props.color || "#33516E"};
        color: #ffffff;
        font-weight: bold;
    }
`;

const SVGIcon = ({ name }) => (
    <StyledSVG>
        <use xlinkHref={`${icons}#${name}`} />
    </StyledSVG>
);

const PostTags = ({ game, tags = [] }) => {
    return (
        <div style={{ paddingBottom: "10px" }}>
            {game && <Tag color="#E34234">{game}</Tag>}
            {tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
        </div>
    );
};

const Post = ({ post }) => (
    <PostBox>
        <PostBody dangerouslySetInnerHTML={{ __html: md.render(post.body) }} />
        <PostTags game={post.game} tags={post.tags} />
        <PostFooter>
            <SVGIcon name="icon-message" />
            <SVGIcon name="icon-pencil" />
            <Link to="/">
                <PostDate>{displayTime(post.date)}</PostDate>
            </Link>
        </PostFooter>
    </PostBox>
);

const Thread = ({ thread, posts }) => (
    <ThreadBox>
        {thread.length === 1 ? <Post post={posts[thread[0]]} /> : null}
        {thread.length > 1 && thread.length < 3
            ? thread.map(postId => <Post key={postId} post={posts[postId]} />)
            : null}
        {thread.length >= 3
            ? thread.map(postId => <Post key={postId} post={posts[postId]} />)
            : null}
    </ThreadBox>
);

const FeedList = ({ threads, posts }) => (
    <StyledFeedList>
        {threads.map((thread, index) => (
            <Thread key={index} thread={thread} posts={posts} />
        ))}
    </StyledFeedList>
);

export default FeedList;
