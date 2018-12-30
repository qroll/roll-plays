import React from "react";
import styled from "styled-components";

import { TagIcon } from "src/components/Icons";

import { TagContainer, Tag, TagInput } from "./Tags";

const TagBar = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
`;

class CustomTagInput extends React.Component {
    state = {
        tagInput: ""
    };

    handleOnChange = e => {
        this.setState({ tagInput: e.target.value });
    };

    handleOnKey = e => {
        let key = e.key;
        let input = this.state.tagInput;
        if (key === "Enter") {
            if (!this.props.tags.includes(input)) {
                let tags = this.props.tags.concat(input);
                this.props.onTagChange(tags);
            }
            this.setState({ tagInput: "" });
        }
        if (key === "Backspace" && !input) {
            let tags = this.props.tags.slice(0, -1);
            this.props.onTagChange(tags);
        }
    };

    render() {
        let { tags } = this.props;
        return (
            <TagBar>
                <TagIcon
                    style={{ alignSelf: "flex-start", paddingRight: "10px" }}
                />
                <TagContainer style={{ flex: "1 auto" }}>
                    {tags.map(tag => {
                        return <Tag key={tag}>{tag}</Tag>;
                    })}
                    <TagInput
                        type="text"
                        value={this.state.tagInput}
                        onChange={this.handleOnChange}
                        onKeyDown={this.handleOnKey}
                        placeholder={tags.length ? null : "Add a tag"}
                    />
                </TagContainer>
            </TagBar>
        );
    }
}

export default CustomTagInput;
