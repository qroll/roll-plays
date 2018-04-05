import React from "react";
import styled from "styled-components";
import { Editor, EditorState, RichUtils } from "draft-js";

import { TextInput, Button } from "./Form";

import "draft-js/dist/Draft.css";

const TextBox = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 10px;

    ${props => (props.focus ? "border: 1px solid #f07241;" : null)};
`;

const StyledFeedBox = styled.div`
    margin: 10px;
`;

class RichEditor extends React.Component {
    state = {
        editorState: EditorState.createEmpty(),
        focus: false
    };

    onChange = editorState => {
        this.setState({ editorState });
    };

    onFocus = () => {
        this.setState({ focus: true });
    };

    onBlur = () => {
        this.setState({ focus: false });
    };

    render() {
        return (
            <TextBox focus={this.state.focus}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    placeholder="What's on your mind?"
                />
            </TextBox>
        );
    }
}

const FeedBox = ({ post, handleOnPostChange, handleOnPostSubmit }) => (
    <StyledFeedBox>
        <RichEditor />
        <Button onClick={handleOnPostSubmit}>Post</Button>
    </StyledFeedBox>
);

export default FeedBox;
