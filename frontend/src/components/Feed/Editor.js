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
                startBlockId: blockId,
                endBlockId: blockId,
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

    computeEndPosition = (blocks, parentBlock, targetChildId) => {
        let actualPosition = 0;
        let i = 0;
        let childId = parentBlock.content[0];
        while (childId !== targetChildId) {
            actualPosition += blocks[childId].content[0].length;
            i++;
            childId = parentBlock.content[i];
        }
        actualPosition += blocks[targetChildId].content[0].length;
        return {
            id: targetChildId,
            index: i,
            position: actualPosition
        }
    }

    getIndexAndPositionOfChild = (blocks, parentBlock, position) => {
        let actualPosition = position;
        let i = 0;
        let childId = parentBlock.content[0];
        while (actualPosition - blocks[childId].content[0].length > 0) {
            actualPosition -= blocks[childId].content[0].length;
            i++;
            childId = parentBlock.content[i];
        }
        return {
            id: childId,
            index: i,
            position: actualPosition
        }
    }

    getStartAndEnd = (blocks, selection) => {
        let { startBlockId, endBlockId, startPosition, endPosition } = selection;
        let start = this.getIndexAndPositionOfChild(blocks, blocks[startBlockId], startPosition);
        let end = this.getIndexAndPositionOfChild(blocks, blocks[endBlockId], endPosition);

        return {
            start,
            end
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("_componentDidUpdate")
        let { selection } = this.state;
        // console.log("componentDidUpdate - selection", selection);

        let selectionObj = window.getSelection();
        selectionObj.removeAllRanges();
        let range = document.createRange();

        let { start, end } = this.getStartAndEnd(this.state.blocks, this.state.selection);
        // console.log('positions', start, end)

        range.setStart(this.refs[start.id].firstChild || this.refs[start.id], start.position);
        range.setEnd(this.refs[end.id].firstChild || this.refs[end.id], end.position);
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
        if (eventType === EVENT_TYPES.DELETE_CONTENT_BACKWARD) {
            // console.log("deleteContent");
            return this.deleteSelection(prevState);
        }
        if (eventType === EVENT_TYPES.INSERT_TEXT) {
            // console.log("insertText");
            return this.insertText(prevState, eventInput);
        }
    }

    insertText = (state, eventInput) => {
        let { start, end } = this.getStartAndEnd(state.blocks, state.selection);

        console.log("insertText")
        // remove any selected text first
        let nextState = this.deleteSelectionRange(state, start, end);
        nextState = this.cleanDanglingTextNodes(nextState, start, end);

        let updatedBlocks = { ...nextState.blocks };
        let updatedSelection = { ...nextState.selection };

        let startBlockId = updatedSelection.startBlockId;
        let startPosition = updatedSelection.startPosition;

        // console.log('what are the text positions', startPosition, endPosition);
        let { id: childId } = this.getIndexAndPositionOfChild(updatedBlocks, updatedBlocks[startBlockId], startPosition);
        // console.log("child block", updatedBlocks[childId]);
        let newContent = updatedBlocks[childId].content[0];

        // add in new input
        newContent =
            newContent.slice(0, updatedSelection.startPosition) +
            (eventInput || '') +
            newContent.slice(updatedSelection.startPosition);
        updatedBlocks[childId].content = [newContent];
        updatedSelection.startPosition += 1;
        updatedSelection.endPosition = updatedSelection.startPosition;
        console.log('final text node', newContent);
        console.log('final selection', updatedSelection);

        return { ...nextState, blocks: updatedBlocks, selection: updatedSelection };
    }

    deleteSelection = (state) => {
        let { blocks, selection } = state;
        let { start, end } = this.getStartAndEnd(blocks, selection);

        if (start.id === end.id && start.index === end.index) {
            let nextState = this.deleteSelectionPoint(state, start, end);
            return this.cleanDanglingTextNodes(nextState, start, end);
        } else {
            let nextState = this.deleteSelectionRange(state, start, end);
            return this.cleanDanglingTextNodes(nextState, start, end);
        }
    }

    deleteSelectionPoint = (state, start, end) => {
        // console.log("deleteSelectionPoint")
        let { blocks: oldBlocks, selection: oldSelection } = state;
        let blocks = { ...oldBlocks };
        let selection = { ...oldSelection };

        let currentContent = blocks[start.id].content[0];

        let newContent;
        // deleting content
        if (start.position === end.position) {
            if (start.position === 0) {
                newContent = currentContent;
            } else {
                // console.log("delete one");
                // delete one character
                newContent =
                    currentContent.slice(0, start.position - 1) +
                    currentContent.slice(end.position);
                selection.startPosition -= 1;
                if (selection.startPosition < 0) {
                    selection.startPosition = 0;
                }
                selection.endPosition = selection.startPosition;
            }
        } else {
            // console.log("delete selection");
            // delete selection
            newContent =
                currentContent.slice(0, start.position) +
                currentContent.slice(end.position);
            selection.endPosition = selection.startPosition;
        }

        // console.log('resulting text node', newContent);
        // console.log('resulting selection', updatedSelection);
        blocks[start.id].content = [newContent];

        return { ...state, blocks, selection }
    }

    deleteSelectionRange = (state, start, end) => {
        console.log("deleteSelectionRange")
        let { blocks: oldBlocks, selection: oldSelection } = state;
        let blocks = { ...oldBlocks };
        let selection = { ...oldSelection };

        let { startBlockId, endBlockId } = selection;
        let startParentBlock = blocks[startBlockId];
        let endParentBlock = blocks[endBlockId];

        if (start.index === end.index) {
            // spanning single child
            let currentContent = blocks[start.id].content[0];

            let newContent =
                currentContent.slice(0, start.position) + currentContent.slice(end.position);
            blocks[start.id].content = [newContent];

            selection.startPosition = selection.startPosition;
            selection.endPosition = selection.startPosition;

            return { ...state, blocks, selection };
        } else {
            // spanning multiple children in the same block
            // delete (partial) first child
            let currentContent = blocks[start.id].content[0];

            let newContent =
                currentContent.slice(0, start.position);
            blocks[start.id].content = [newContent];

            start.index++;
            // delete in between
            while (start.index < end.index) {
                console.log(start.index)
                let currBlockId = startParentBlock.content[start.index];
                let newContent = "";
                blocks[currBlockId].content = [newContent];
                start.index++;
            }

            // delete (partial) last child
            let endContent = blocks[end.id].content[0];
            let newEndContent =
                endContent.slice(end.position);
            blocks[end.id].content = [newEndContent];
            selection.startPosition = selection.startPosition;
            selection.endPosition = selection.startPosition;

            return { ...state, blocks, selection };
        }
        return state;
    }

    cleanDanglingTextNodes = (state, start, end) => {
        console.log("cleanDanglingTextNodes")
        let { blocks, selection } = state;
        let updatedBlocks = { ...blocks };
        let updatedSelection = { ...selection };
        let { startBlockId } = updatedSelection;

        let parentBlock = { ...updatedBlocks[startBlockId] };
        let children = parentBlock.content;
        let markedForDeletion = children.filter((childId) => updatedBlocks[childId].content[0].length === 0);
        let remaining = children.filter((childId) => updatedBlocks[childId].content[0].length > 0);

        console.log('markedForDeletion', markedForDeletion);
        if (markedForDeletion.length === children.length) {
            console.log("keep an empty text node");
            // keep an empty text node
            markedForDeletion.forEach((childId, i) => {
                if (i === 0) {
                    return;
                }
                delete updatedBlocks[childId];
            });
            parentBlock.content = [parentBlock.content[0]];
            updatedSelection.startPosition = 0;
            updatedSelection.endPosition = 0;
            updatedBlocks[parentBlock.id] = parentBlock;
        } else if (markedForDeletion.length > 0) {
            let lastDeletedNodeId = parentBlock.content.findIndex(childId => childId === markedForDeletion[0]);
            if (lastDeletedNodeId === 0) {
                markedForDeletion.forEach((childId, i) => {
                    if (i === 0) {
                        return;
                    }
                    delete updatedBlocks[childId];
                });
                console.log("keep an empty text node");
                // keep an empty text node
                parentBlock.content = [parentBlock.content[0], ...remaining];
                updatedSelection.startPosition = 0;
                updatedSelection.endPosition = 0;
            } else {
                parentBlock.content = remaining;
                markedForDeletion.forEach((childId, i) => {
                    delete updatedBlocks[childId];
                });
                console.log("move to the previous node");
                // move to previous node
                let start = this.computeEndPosition(updatedBlocks, parentBlock, parentBlock.content[lastDeletedNodeId - 1]);
                updatedSelection.startPosition = start.position;
                updatedSelection.endPosition = start.position;
            }
            updatedBlocks[parentBlock.id] = parentBlock;
        }

        return { ...state, blocks: updatedBlocks, selection: updatedSelection };
    }

    _onMetaKey = event => {
        console.log("_onMetaKey");
        // console.log("event key", event.key);
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
        // console.log("event key", event.key);
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

        let parentBlockId = this.state.blocks[startContainer.parentNode.dataset.blockid].parent;
        let endParentBlockId = this.state.blocks[endContainer.parentNode.dataset.blockid].parent;
        let actualStartPosition = 0, actualEndPosition = 0;
        let startId = startContainer.parentNode.dataset.blockid + "";
        let endId = endContainer.parentNode.dataset.blockid + "";
        let contentBlocks = this.state.blocks[parentBlockId].content;
        let endContentBlocks = this.state.blocks[endParentBlockId].content;

        let i = 0;
        let currNode = contentBlocks[0];
        while (currNode !== startId) {
            actualStartPosition += this.state.blocks[currNode].content[0].length;
            i++;
            currNode = contentBlocks[i];
        }
        actualStartPosition += startPosition;

        let j = 0;
        let endCurrNode = endContentBlocks[0];
        while (endCurrNode !== endId) {
            actualEndPosition += this.state.blocks[endCurrNode].content[0].length;
            j++;
            endCurrNode = contentBlocks[j];

        }
        actualEndPosition += endPosition;

        let selectionState = {
            startBlockId: parentBlockId,
            endBlockId: endParentBlockId,
            startPosition: actualStartPosition,
            endPosition: actualEndPosition
        }

        // console.log("selectionState", selectionState)

        this.setState({ selection: selectionState });
    };

    renderComponent(block) {
        // console.log("rendering component", block.content);
        let commonProps = {
            key: block.id,
            "data-blockid": block.id,
            innerRef: ref => { this.refs = { ...this.refs, [block.id]: ref }; },
            onMouseUp: this._onSelectionEnd(block.id),
            // contentEditable: true,
            // suppressContentEditableWarning: true
        }
        let inputProps = {
            onKeyDown: this._onMetaKey,
            onKeyPress: this._onInput
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

    render() {
        // console.log(this.state.order);
        // console.log(this.state.selection);
        console.log(this.state.blocks);
        return (
            <TextArea innerRef={ref => { this.textarea = ref }} contentEditable suppressContentEditableWarning onKeyDown={this._onMetaKey}
                onKeyPress={this._onInput}>
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
