import React from "react";
import styled from "styled-components";
import stringify from "stringify-entities";

import Header1 from "./components/Header1";
import Block from "./components/Block";
import Bold from "./components/Bold";
import Span from "./components/Span";
import Caret from "./components/Caret";

import EVENT_TYPES from "./EventTypes";
import EditorState from "./EditorState";

const TextArea = styled.div`
    background-color: #fff;
    border: 1px solid #e0e0e0;
    padding: 10px;
    position: relative;

    ${props => (props.focus ? "border: 1px solid #f07241;" : null)};
`;

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = EditorState.init();
        this.refs = {};
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("_componentDidUpdate");
        let { selection } = this.state;

        let selectionObj = window.getSelection();
        selectionObj.removeAllRanges();
        let range = document.createRange();

        let { start, end } = EditorState.getStartAndEnd(
            this.state.blocks,
            this.state.selection
        );
        // console.log('positions', start, end)

        range.setStart(
            this.refs[start.id].firstChild || this.refs[start.id],
            start.position
        );
        range.setEnd(
            this.refs[end.id].firstChild || this.refs[end.id],
            end.position
        );
        selectionObj.addRange(range);

        // if (range.collapsed) {
        //     let x = 0, y = 0;
        //     if (range.getClientRects().length > 0) {
        //         let rect = range.getClientRects()[0];
        //         x = rect.left;
        //         y = rect.top;
        //     }

        //     let parentPos = this.textarea.getClientRects()[0];
        //     let relativeX = x - parentPos.left;
        //     let relativeY = y - parentPos.top;

        //     this.caret.style.left = relativeX + 'px';
        //     this.caret.style.top = relativeY + 'px';
        // }
    }

    _onInput = event => {
        console.log("_onInput");
        event.preventDefault();
        event.stopPropagation();
        // event.nativeEvent.preventDefault();
        // event.nativeEvent.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        console.log(event.nativeEvent);

        let eventInput = event.nativeEvent.data;
        let eventType = EditorState.mapInputEventToType(event.nativeEvent);
        if (!eventType) {
            return;
        }
        this.setState(prevState => {
            return EditorState.updateContent(prevState, {
                eventType,
                eventInput
            });
        });
    };

    _onMetaKey = event => {
        console.log("_onMetaKey");
        // console.log("event key", event.nativeEvent, event.key, event.eventType);
        let eventInput = event.key;
        let eventType = EditorState.mapEventKeyToType(event.key);
        if (!eventType) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this.setState(prevState => {
            return EditorState.updateContent(prevState, {
                eventType,
                eventInput
            });
        });
    };

    _onKey = event => {
        event.preventDefault();
        event.stopPropagation();
        console.log("_onKey");
        // console.log("event key", event.nativeEvent, event.key);
        let eventInput = event.key;
        this.setState(prevState => {
            return EditorState.updateContent(prevState, {
                eventType: EVENT_TYPES.INSERT_TEXT,
                eventInput
            });
        });
    };

    _onSelectionEnd = event => {
        console.log("_onSelectionEnd");
        // console.log("blockId", blockId);
        event.preventDefault();
        event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();

        let selectionObj = window.getSelection();
        let rangeCount = selectionObj.rangeCount;
        if (!(rangeCount > 0)) {
            return;
        }
        let startContainer = selectionObj.getRangeAt(0).startContainer;
        let endContainer = selectionObj.getRangeAt(0).endContainer;
        let startPosition = selectionObj.getRangeAt(0).startOffset;
        let endPosition = selectionObj.getRangeAt(0).endOffset;

        let parentBlockId = this.state.blocks[
            startContainer.parentNode.dataset.blockid
        ].parent;
        let endParentBlockId = this.state.blocks[
            endContainer.parentNode.dataset.blockid
        ].parent;
        let actualStartPosition = 0,
            actualEndPosition = 0;
        let startId = startContainer.parentNode.dataset.blockid + "";
        let endId = endContainer.parentNode.dataset.blockid + "";
        let contentBlocks = this.state.blocks[parentBlockId].content;
        let endContentBlocks = this.state.blocks[endParentBlockId].content;

        let i = 0;
        let currNode = contentBlocks[0];
        while (currNode !== startId) {
            actualStartPosition += this.state.blocks[currNode].content[0]
                .length;
            i++;
            currNode = contentBlocks[i];
        }
        actualStartPosition += startPosition;

        let j = 0;
        let endCurrNode = endContentBlocks[0];
        while (endCurrNode !== endId) {
            actualEndPosition += this.state.blocks[endCurrNode].content[0]
                .length;
            j++;
            endCurrNode = contentBlocks[j];
        }
        actualEndPosition += endPosition;

        let selectionState = {
            startBlockId: parentBlockId,
            endBlockId: endParentBlockId,
            startPosition: actualStartPosition,
            endPosition: actualEndPosition
        };

        // console.log("selectionState", selectionState)

        this.setState({ selection: selectionState });
    };

    renderComponent(block) {
        // console.log("rendering component", block.content);
        let commonProps = {
            key: block.id,
            "data-blockid": block.id,
            innerRef: ref => {
                this.refs = { ...this.refs, [block.id]: ref };
            }
            // onMouseUp: this._onSelectionEnd
            // contentEditable: true,
            // suppressContentEditableWarning: true
        };
        let inputProps = {
            // onKeyDown: this._onMetaKey,
            // onKeyPress: this._onInput
        };

        if (block.type === "block") {
            return (
                <Block {...commonProps}>
                    {block.content.map(blockId => {
                        let childBlock = this.state.blocks[blockId];
                        return this.renderComponent(childBlock);
                    })}
                </Block>
            );
        }
        if (block.type === "text") {
            return (
                <Span {...commonProps} {...inputProps}>
                    {block.content[0]}
                </Span>
            );
        }
        if (block.type === "bold") {
            return (
                <Bold {...commonProps} {...inputProps}>
                    {block.content[0]}
                </Bold>
            );
        }
    }

    _help = event => {
        if (event.key === "Enter") {
            event.preventDefault();
            this.setState(prevState => {
                return EditorState.updateContent(prevState, {
                    eventType: EVENT_TYPES.INSERT_PARAGRAPH,
                    eventInput: null
                });
            });
        }
    };

    render() {
        // console.log(this.state.order);
        console.log(this.state.selection);
        console.log(this.state.blocks);
        return (
            <TextArea
                innerRef={ref => {
                    this.textarea = ref;
                }}
                contentEditable
                suppressContentEditableWarning
                onInput={this._onInput}
                onSelect={this._onSelectionEnd}
            >
                <div>
                    {this.state.order.map(blockId => {
                        let block = this.state.blocks[blockId];
                        return this.renderComponent(block);
                    })}
                </div>
                {/* <Caret innerRef={ref => { this.caret = ref }} /> */}
            </TextArea>
        );
    }
}

export default Editor;
