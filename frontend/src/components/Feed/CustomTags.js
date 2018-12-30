import React from "react";
import styled from "styled-components";

import { TagIcon } from "src/components/Icons";
import { GRAY } from "src/components/styles";
import { getContrastColor } from "src/utils/color";

const TagBar = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
`;

const Tags = styled.div`
    align-items: center;
    overflow-x: scroll;
    display: flex;
    flex: 1 auto;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Tag = styled.span`
    background-color: ${props => props.color || "#33516E"};
    border-radius: 3px;
    color: ${props => getContrastColor(props.color || "#33516E")};
    cursor: default;
    flex-shrink: 0;
    font-size: 0.75em;
    height: fit-content;
    margin: 0 5px 5px 0;
    max-width: calc(100% - 15px);
    padding: 3px 5px;
    word-break: break-word;
`;

const Input = styled.input`
    background: none;
    border: none;
    flex: 1 auto;
    font-family: "Roboto";
    font-size: 0.75rem;
    padding: 5px;
    outline: none;

    &::placeholder {
        color: ${GRAY.LIGHT};
    }
`;

class CustomTags extends React.Component {
    state = {
        tagInput: ""
    };

    handleOnChange = e => {
        this.setState({ tagInput: e.target.value });
    };

    handleOnEnter = e => {
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
                <TagIcon style={{ alignSelf: "flex-start" }} />
                <Tags>
                    {tags.map(tag => {
                        return <Tag key={tag}>{tag}</Tag>;
                    })}
                    <Input
                        type="text"
                        value={this.state.tagInput}
                        onChange={this.handleOnChange}
                        onKeyDown={this.handleOnEnter}
                        placeholder={tags.length ? null : "Add a tag"}
                    />
                </Tags>
            </TagBar>
        );
    }
}

export default CustomTags;
