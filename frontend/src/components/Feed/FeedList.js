import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import markdown from "markdown-it";

import { getContrastColor } from "../../util/color";
import { displayTime } from "../../util/time";

const md = markdown();

const PostBox = styled.div`
    background-color: #fff;
    padding: 15px;
    overflow-wrap: break-word;

    &:not(:last-of-type) {
        border-bottom: 1px solid #e0e0e0;
    }

    &:hover {
        background-color: #fafafa;
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
    margin: 10px;
`;

const Tag = styled.span`
    background-color: ${props => props.color || "#33516E"};
    border-radius: 3px;
    color: ${props => getContrastColor(props.color || "#33516E")};
    cursor: default;
    font-size: 0.75em;
    margin-right: 5px;
    padding: 3px 5px;
`;

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
            <Link to="/">
                <PostDate>{displayTime(post.date)}</PostDate>
            </Link>
        </PostFooter>
    </PostBox>
);

const FeedList = ({ posts }) => (
    <StyledFeedList>
        {posts.map(post => <Post key={post._id} post={post} />)}
    </StyledFeedList>
);

export default FeedList;
