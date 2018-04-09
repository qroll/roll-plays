import React from "react";
import styled from "styled-components";
import { Editor, EditorState } from "draft-js";

import { Button } from "../Form";

import decorator from "./decorators";

import "draft-js/dist/Draft.css";

const TextBox = styled.div`
    background-color: #fff;
    border: 1px solid #e0e0e0;
    padding: 10px;

    ${props => (props.focus ? "border: 1px solid #f07241;" : null)};
`;

const StyledFeedBox = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
`;

const PostButton = Button.extend`
    align-self: flex-end;
    margin-top: 10px;
`;

class RichEditor extends React.Component {
    state = {
        editorState: EditorState.createEmpty(decorator)
    };

    onChange = editorState => {
        this.setState({ editorState });
    };

    render() {
        let { onFocus, onBlur, focus } = this.props;
        return (
            <TextBox focus={focus}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder="What's on your mind?"
                />
            </TextBox>
        );
    }
}

class FeedBox extends React.Component {
    state = {
        focus: false
    };

    onFocus = () => {
        this.setState({ focus: true });
    };

    onBlur = () => {
        this.setState({ focus: false });
    };

    render() {
        let { handleOnPostChange, handleOnPostSubmit } = this.props;
        return (
            <StyledFeedBox>
                <RichEditor
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    focus={this.props.focus}
                    onChange={handleOnPostChange}
                />
                {this.state.focus && (
                    <PostButton onClick={handleOnPostSubmit}>Post</PostButton>
                )}
            </StyledFeedBox>
        );
    }
}

export default FeedBox;
