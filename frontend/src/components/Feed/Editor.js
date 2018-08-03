import React from "react";
import styled from "styled-components";
import stringify from "stringify-entities";

import Header1 from "./components/Header1";
import Block from "./components/Block";
import Bold from "./components/Bold";
import Span from "./components/Span";
import Caret from "./components/Caret";

import EVENT_TYPES from "./EventTypes";

const TextArea = styled.div`
    background-color: #fff;
    border: 1px solid #e0e0e0;
    padding: 10px;
    position: relative;

    ${props => (props.focus ? "border: 1px solid #f07241;" : null)};
`;

const uuid = () => {
    return (
        Date.now() +
        Math.floor(Math.random() * 1000 + 1)
            .toString(10)
            .padStart(3, "0")
    );
};

const insertAfter = (arr, element, index) => {
    return [...arr.slice(0, index + 1), element, ...arr.slice(index + 1)];
};

class EditorState {
    static init() {
        let blockId = uuid();
        let blockId2 = uuid();
        let textContentId = uuid();
        let textContentId2 = uuid();
        let boldContentId = uuid();
        let textContentId3 = uuid();
        return {
            blocks: {
                [blockId]: {
                    id: blockId,
                    type: "block",
                    content: [textContentId, boldContentId, textContentId2]
                },
                [textContentId]: {
                    id: textContentId,
                    type: "text",
                    content: ["wow"],
                    parent: blockId
                },
                [textContentId2]: {
                    id: textContentId2,
                    type: "text",
                    content: ["hey"],
                    parent: blockId
                },
                [boldContentId]: {
                    id: boldContentId,
                    type: "bold",
                    content: ["bolded"],
                    parent: blockId
                },
                [blockId2]: {
                    id: blockId2,
                    type: "block",
                    content: [textContentId3]
                },
                [textContentId3]: {
                    id: textContentId3,
                    type: "text",
                    content: ["hello this is a very long string for testing"],
                    parent: blockId2
                },
            },
            order: [blockId, blockId2],
            selection: {
                startBlock: textContentId,
                endBlock: textContentId,
                startPosition: 0,
                endPosition: 0
            },
            forceKeyboard: true
        };
    }
}

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = EditorState.init();
        this.refs = {};
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("_componentDidUpdate")
        let { selection } = this.state;
        // console.log("componentDidUpdate - selection", selection);

        let selectionObj = window.getSelection();
        selectionObj.removeAllRanges();
        let range = document.createRange();
        range.setStart(this.refs[selection.startBlock].firstChild, selection.startPosition);
        range.setEnd(this.refs[selection.endBlock].firstChild, selection.endPosition);
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

    mapEventKeyToType = (key) => {
        switch (key) {
            case 'Backspace':
                return EVENT_TYPES.DELETE_CONTENT_BACKWARD;
            case 'ArrowLeft':
                return EVENT_TYPES.ARROW_LEFT;
            case 'ArrowRight':
                return EVENT_TYPES.ARROW_RIGHT;
            default:
                return null;
        }
    }

    updateContent = (prevState, { eventType, eventInput }) => {
        let selection = prevState.selection;
        let startBlockId = selection.startBlock;
        let startPosition = selection.startPosition;
        let endBlockId = selection.endBlock;
        let endPosition = selection.endPosition;

        let isSingleBlock = prevState.blocks[startBlockId].parent === prevState.blocks[endBlockId].parent;

        let updatedBlocks = { ...prevState.blocks };
        let updatedSelection = { ...selection };

        if (eventType === EVENT_TYPES.DELETE_CONTENT_BACKWARD) {
            return this.deleteContent(prevState);
        }
        if (eventType === EVENT_TYPES.INSERT_TEXT) {
            return this.insertText(prevState, eventInput);
        }
    }

    insertText = (prevState, eventInput) => {
        let selection = prevState.selection;
        let startBlockId = selection.startBlock;
        let startPosition = selection.startPosition;
        let endBlockId = selection.endBlock;
        let endPosition = selection.endPosition;

        let isSingleBlock = prevState.blocks[startBlockId].parent === prevState.blocks[endBlockId].parent;

        let updatedBlocks = { ...prevState.blocks };
        let updatedSelection = { ...selection };

        if (isSingleBlock) {
            // clear out blocks in between
            let parentId = prevState.blocks[startBlockId].parent;
            let parentBlock = { ...prevState.blocks[parentId] };
            let startIndex = parentBlock.content.findIndex(id => id === startBlockId);
            let endIndex = parentBlock.content.findIndex(id => id === endBlockId);

            // single content child?
            // console.log('what are the text positions', startPosition, endPosition);
            let newContent;

            if (startIndex === endIndex) {
                // only have to update the content child
                let contentChild = prevState.blocks[startBlockId];
                let currentContent = prevState.blocks[startBlockId].content[0];
                // replacing content
                newContent =
                    currentContent.slice(0, startPosition) +
                    currentContent.slice(endPosition);
                updatedSelection.endPosition = updatedSelection.startPosition;

                // console.log('resulting text node', newContent);
                // console.log('resulting selection', updatedSelection);
                updatedBlocks[startBlockId].content = [newContent];
                // add in new input
                newContent =
                    newContent.slice(0, updatedSelection.startPosition) +
                    (eventInput || '') +
                    newContent.slice(updatedSelection.startPosition);
                updatedBlocks[startBlockId].content = [newContent];
                updatedSelection.startPosition += 1;
                updatedSelection.endPosition = updatedSelection.startPosition;
            }

            // console.log('final text node', newContent);
            // console.log('final selection', updatedSelection);
        }

        return { blocks: updatedBlocks, selection: updatedSelection };
    }

    deleteContent = (prevState) => {
        let selection = prevState.selection;
        let startBlockId = selection.startBlock;
        let startPosition = selection.startPosition;
        let endBlockId = selection.endBlock;
        let endPosition = selection.endPosition;

        // single content child?
        let isSingleBlock = prevState.blocks[startBlockId].parent === prevState.blocks[endBlockId].parent;

        let updatedBlocks = { ...prevState.blocks };
        let updatedSelection = { ...selection };
        if (isSingleBlock) {
            // clear out blocks in between
            let parentId = prevState.blocks[startBlockId].parent;
            let parentBlock = { ...prevState.blocks[parentId] };
            let startIndex = parentBlock.content.findIndex(id => id === startBlockId);
            let endIndex = parentBlock.content.findIndex(id => id === endBlockId);

            // console.log('what are the text positions', startPosition, endPosition);
            let newContent;

            if (startIndex === endIndex) {
                // only have to update the content child
                let contentChild = prevState.blocks[startBlockId];
                let currentContent = prevState.blocks[startBlockId].content[0];

                // deleting content
                if (startPosition === endPosition) {
                    if (startPosition === 0) {
                        newContent = currentContent;
                    } else {
                        console.log("delete one");
                        // delete one character
                        newContent =
                            currentContent.slice(0, startPosition - 1) +
                            currentContent.slice(endPosition);
                        updatedSelection.startPosition -= 1;
                        if (updatedSelection.startPosition < 0) {
                            updatedSelection.startPosition = 0;
                        }
                        updatedSelection.endPosition = updatedSelection.startPosition;
                    }
                } else {
                    console.log("delete selection");
                    // delete selection
                    newContent =
                        currentContent.slice(0, startPosition) +
                        currentContent.slice(endPosition);
                    updatedSelection.endPosition = updatedSelection.startPosition;
                }
            }

            // console.log('resulting text node', newContent);
            // console.log('resulting selection', updatedSelection);

            if (newContent.length === 0) {
                if (startIndex === 0) {
                    console.log("keep an empty text node");
                    // keep an empty text node
                    updatedSelection.startPosition = 0;
                    updatedSelection.endPosition = 0;
                } else {
                    console.log("move to the previous node");
                    delete updatedBlocks[startBlockId];
                    parentBlock.content.splice(startIndex, 1);
                    // move to the previous node
                    let prevChildId = parentBlock.content[startIndex - 1];
                    updatedSelection.startBlock = prevChildId;
                    updatedSelection.endBlock = prevChildId;
                    updatedSelection.startPosition = prevState.blocks[prevChildId].content[0].length - 1;
                    updatedSelection.endPosition = prevState.blocks[prevChildId].content[0].length - 1;
                }
            } else {
                updatedBlocks[startBlockId].content = [newContent];
            }
        }
        return { blocks: updatedBlocks, selection: updatedSelection };
    }

    _onMetaKey = event => {
        console.log("_onMetaKey");
        console.log("event key", event.key);
        let eventInput = event.key;
        let eventType = this.mapEventKeyToType(event.key);
        if (!eventType) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this.setState(prevState => {
            return this.updateContent(prevState, { eventType, eventInput })
        })
    };

    _onInput = event => {
        event.preventDefault();
        event.stopPropagation();
        console.log("_onInput");
        console.log("event key", event.key);
        let eventInput = event.key;
        this.setState(prevState => {
            return this.updateContent(prevState, { eventType: EVENT_TYPES.INSERT_TEXT, eventInput })
        });
    };

    _onSelectionEnd = blockId => event => {
        console.log("_onSelectionEnd");
        // console.log("blockId", blockId);
        // event.preventDefault();
        event.stopPropagation();

        let selectionObj = window.getSelection();
        let rangeCount = selectionObj.rangeCount;
        if (!(rangeCount > 0)) {
            return;
        }
        let startContainer = selectionObj.getRangeAt(0).startContainer;
        let endContainer = selectionObj.getRangeAt(0).endContainer;
        let startPosition = selectionObj.getRangeAt(0).startOffset;
        let endPosition = selectionObj.getRangeAt(0).endOffset;

        let selectionState = {
            startBlock: startContainer.parentNode.dataset.blockid,
            endBlock: endContainer.parentNode.dataset.blockid,
            startPosition,
            endPosition
        }

        // console.log("selectionState", selectionState)

        this.setState({ selection: selectionState });
    };

    getNodesBetween = selectionObj => {
        let startContainer = selectionObj.getRangeAt(0).startContainer;
        let endContainer = selectionObj.getRangeAt(0).endContainer;
        let startPosition = selectionObj.getRangeAt(0).startOffset;
        let endPosition = selectionObj.getRangeAt(0).endOffset;

        if (startContainer.isSameNode(endContainer)) {
            console.log("getNodesBetween: a single element was selected");
            return [{ node: startContainer, startPosition, endPosition }];
        }

        // assumes browser only allows contiguous selection
        let currNode = startContainer.parentNode;
        let endNode = endContainer.parentNode;
        let nodes = [
            {
                node: currNode,
                startPosition,
                endPosition: currNode.textContent.length
            }
        ];
        currNode = currNode.nextSibling;
        while (currNode && !currNode.isSameNode(endNode)) {
            nodes.push({
                node: currNode,
                startPosition: 0,
                endPosition: currNode.textContent.length
            });
            currNode = currNode.nextSibling;
        }
        nodes.push({ node: currNode, startPosition: 0, endPosition });

        return nodes;
    };

    renderComponent(block) {
        // console.log("rendering component", block);
        let commonProps = {
            "data-blockid": block.id,
            onMouseUp: this._onSelectionEnd(block.id),
            innerRef: ref => { this.refs = { ...this.refs, [block.id]: ref }; },
            key: block.id,
            contentEditable: true,
            suppressContentEditableWarning: true,
            onKeyDown: this._onMetaKey,
            onKeyPress: this._onInput,
            tabIndex: 0
        }

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
                <Span {...commonProps}>
                    {block.content[0]}
                </Span>
            );
        }
        if (block.type === "bold") {
            return (
                <Bold {...commonProps}>
                    {block.content[0]}
                </Bold>
            );
        }
    }

    render() {
        // console.log(this.state.order);
        // console.log(this.state.selection);
        console.log(this.state.blocks);
        return (
            <TextArea innerRef={ref => { this.textarea = ref }}>
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
