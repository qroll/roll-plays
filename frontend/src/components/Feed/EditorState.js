import EVENT_TYPES from "./EventTypes";

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
                }
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

    static computeEndPosition = (blocks, parentBlock, targetChildId) => {
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
        };
    };

    static computeStartPosition = (blocks, parentBlock, targetChildId) => {
        let actualPosition = 0;
        let i = 0;
        let childId = parentBlock.content[0];
        while (childId !== targetChildId) {
            actualPosition += blocks[childId].content[0].length;
            i++;
            childId = parentBlock.content[i];
        }
        return {
            id: targetChildId,
            index: i,
            position: actualPosition
        };
    };

    static getIndexAndPositionOfChild = (blocks, parentBlock, position) => {
        let actualPosition = position;
        let i = 0;
        let childId = parentBlock.content[0];

        while (actualPosition - blocks[childId].content[0].length > 0) {
            actualPosition -= blocks[childId].content[0].length;
            i++;
            if (i >= parentBlock.content.length) {
                break;
            }
            childId = parentBlock.content[i];
        }

        return {
            id: childId,
            index: i,
            position: actualPosition
        };
    };

    static getStartAndEnd = (blocks, selection) => {
        let {
            startBlockId,
            endBlockId,
            startPosition,
            endPosition
        } = selection;
        let start = EditorState.getIndexAndPositionOfChild(
            blocks,
            blocks[startBlockId],
            startPosition
        );
        let end = EditorState.getIndexAndPositionOfChild(
            blocks,
            blocks[endBlockId],
            endPosition
        );

        return {
            start,
            end
        };
    };

    static updateContent = (prevState, { eventType, eventInput }) => {
        if (eventType === EVENT_TYPES.DELETE_CONTENT_BACKWARD) {
            return EditorState.deleteContentBackward(prevState);
        }
        if (eventType === EVENT_TYPES.DELETE_CONTENT_FORWARD) {
            return EditorState.deleteContentForward(prevState);
        }
        if (eventType === EVENT_TYPES.INSERT_TEXT) {
            return EditorState.insertText(prevState, eventInput);
        }
        if (eventType === EVENT_TYPES.INSERT_PARAGRAPH) {
            return EditorState.insertParagraph(prevState, eventInput);
        }
    };

    static insertText = (state, eventInput) => {
        let { start, end } = EditorState.getStartAndEnd(
            state.blocks,
            state.selection
        );

        console.log("insertText");
        // remove any selected text first
        let nextState = EditorState.deleteSelectionRange(state, start, end);
        nextState = EditorState.cleanDanglingTextNodes(nextState, start, end);

        let updatedBlocks = { ...nextState.blocks };
        let updatedSelection = { ...nextState.selection };

        let startBlockId = updatedSelection.startBlockId;
        let startPosition = updatedSelection.startPosition;

        // console.log('what are the text positions', startPosition, endPosition);
        let {
            id: childId,
            position: actualPosition
        } = EditorState.getIndexAndPositionOfChild(
            updatedBlocks,
            updatedBlocks[startBlockId],
            startPosition
        );
        // console.log("child block", updatedBlocks[childId]);
        let newContent = updatedBlocks[childId].content[0];

        // add in new input
        newContent =
            newContent.slice(0, actualPosition) +
            (eventInput || "") +
            newContent.slice(actualPosition);
        updatedBlocks[childId].content = [newContent];
        updatedSelection.startPosition += eventInput.length;
        updatedSelection.endPosition = updatedSelection.startPosition;

        // console.log('final text node', newContent);
        // console.log('final selection', updatedSelection);

        nextState = {
            ...nextState,
            blocks: updatedBlocks,
            selection: updatedSelection
        };
        nextState = EditorState.parseMarkdown(nextState);
        return nextState;
    };

    static insertParagraph = (state, eventInput) => {
        console.log("insertParagraph");
        let { start, end } = EditorState.getStartAndEnd(
            state.blocks,
            state.selection
        );

        // remove any selected text first
        let nextState = EditorState.deleteSelectionRange(state, start, end);
        nextState = EditorState.cleanDanglingTextNodes(nextState, start, end);

        let order = nextState.order.slice();
        let blocks = { ...nextState.blocks };
        let selection = { ...nextState.selection };

        let {
            id: childId,
            position: actualPosition
        } = EditorState.getIndexAndPositionOfChild(
            blocks,
            blocks[selection.startBlockId],
            selection.startPosition
        );
        let originalContent = blocks[childId].content[0];
        // add in new input
        let newContent = originalContent.slice(actualPosition);

        // update text in previous text block
        blocks[childId].content = [originalContent.slice(0, actualPosition)];

        // create a new text block
        let newBlockId = uuid();
        let newTextId = uuid();
        let newText = {
            id: newTextId,
            type: "text",
            content: [newContent],
            parent: newBlockId
        };
        let newBlock = {
            id: newBlockId,
            type: "block",
            content: [newTextId]
        };

        let index = order.findIndex(
            blockId => blockId === selection.startBlockId
        );
        order = [
            ...order.slice(0, index + 1),
            newBlockId,
            ...order.slice(index + 1)
        ];

        blocks[newBlockId] = newBlock;
        blocks[newTextId] = newText;

        selection.startBlockId = newBlockId;
        selection.endBlockId = newBlockId;
        selection.startPosition = 0;
        selection.endPosition = 0;

        // console.log("final order", order);
        // console.log("final blocks", blocks);
        // console.log("final selection", selection);

        nextState = {
            ...nextState,
            order,
            blocks,
            selection
        };
        return nextState;
    };

    static parseMarkdown = prevState => {
        let blocks = { ...prevState.blocks };
        let selection = { ...prevState.selection };
        let { start, end } = EditorState.getStartAndEnd(blocks, selection);

        let startBlockId = start.id;
        let content = blocks[start.id].content[0];

        let bold = /(\*.+\*) /;

        let match = bold.exec(content);
        if (match) {
            console.log("bolding");
            let index = match.index;
            let lastIndex = index + match[0].length;
            let actualContent = match[1].slice(1, -1);
            let remainingContent = content.slice(lastIndex);
            blocks[startBlockId].content = [content.slice(0, index)];

            // insert a new text node
            let leftId = uuid();
            let leftBlock = {
                id: leftId,
                content: [actualContent],
                type: "bold",
                parent: selection.startBlockId
            };
            blocks[leftId] = leftBlock;

            // insert a new text node
            let newId = uuid();
            let newBlock = {
                id: newId,
                content: [
                    remainingContent.length > 0 ? " " + remainingContent : " "
                ],
                type: "text",
                parent: selection.startBlockId
            };
            blocks[newId] = newBlock;

            // add it to the parent
            let parentContent = blocks[selection.startBlockId].content;
            let i = parentContent.findIndex(
                childId => childId === startBlockId
            );
            parentContent = [
                ...parentContent.slice(0, i + 1),
                leftId,
                newId,
                ...parentContent.slice(i + 1)
            ];
            blocks[selection.startBlockId].content = parentContent;

            console.log("final blocks", blocks, remainingContent);

            // move selection to the new text node
            let info = EditorState.computeStartPosition(
                blocks,
                blocks[selection.startBlockId],
                newId
            );
            selection.startPosition = info.position + 1;
            selection.endPosition = info.position + 1;
        }

        return { ...prevState, blocks, selection };
    };

    static mapEventKeyToType = key => {
        switch (key) {
            case "Backspace":
                return EVENT_TYPES.DELETE_CONTENT_BACKWARD;
            case "ArrowLeft":
                return EVENT_TYPES.ARROW_LEFT;
            case "ArrowRight":
                return EVENT_TYPES.ARROW_RIGHT;
            default:
                return null;
        }
    };

    static mapInputEventToType = event => {
        switch (event.inputType) {
            case "insertText":
                return EVENT_TYPES.INSERT_TEXT;
            case "insertCompositionText":
                return EVENT_TYPES.INSERT_TEXT;
            case "deleteContentBackward":
                return EVENT_TYPES.DELETE_CONTENT_BACKWARD;
            case "ArrowLeft":
                return EVENT_TYPES.ARROW_LEFT;
            case "ArrowRight":
                return EVENT_TYPES.ARROW_RIGHT;
            case "insertParagraph":
                return EVENT_TYPES.INSERT_PARAGRAPH;
            default:
                return null;
        }
    };

    static deleteContentBackward = state => {
        console.log("deleteContentBackward");
        let { blocks, selection } = state;
        let { start, end } = EditorState.getStartAndEnd(blocks, selection);

        if (start.id === end.id && start.index === end.index) {
            let nextState = EditorState.deleteSelectionBackward(
                state,
                start,
                end
            );
            return EditorState.cleanDanglingTextNodes(nextState, start, end);
        } else {
            let nextState = EditorState.deleteSelectionRange(state, start, end);
            return EditorState.cleanDanglingTextNodes(nextState, start, end);
        }
    };

    static deleteContentForward = state => {
        console.log("deleteContentForward");
        let { blocks, selection } = state;
        let { start, end } = EditorState.getStartAndEnd(blocks, selection);

        if (start.id === end.id && start.index === end.index) {
            let nextState = EditorState.deleteSelectionForward(
                state,
                start,
                end
            );
            return EditorState.cleanDanglingTextNodes(nextState, start, end);
        } else {
            let nextState = EditorState.deleteSelectionRange(state, start, end);
            return EditorState.cleanDanglingTextNodes(nextState, start, end);
        }
    };

    static deleteSelectionBackward = (state, start, end) => {
        // console.log("deleteSelectionBackward")
        let { blocks: oldBlocks, selection: oldSelection } = state;
        let blocks = { ...oldBlocks };
        let selection = { ...oldSelection };

        let currentContent = blocks[start.id].content[0];

        let newContent;
        // deleting content
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

        // console.log('resulting text node', newContent);
        // console.log('resulting selection', updatedSelection);
        blocks[start.id].content = [newContent];

        return { ...state, blocks, selection };
    };

    static deleteSelectionForward = (state, start, end) => {
        // console.log("deleteSelectionBackward")
        let { blocks: oldBlocks, selection: oldSelection } = state;
        let blocks = { ...oldBlocks };
        let selection = { ...oldSelection };

        let currentContent = blocks[start.id].content[0];

        let newContent;
        // deleting content
        if (start.position === currentContent.length) {
            newContent = currentContent;
        } else {
            console.log("delete one");
            // delete one character
            newContent =
                currentContent.slice(0, start.position) +
                currentContent.slice(end.position - 1);
            selection.startPosition -= 1;
            if (selection.startPosition < 0) {
                selection.startPosition = 0;
            }
            selection.endPosition = selection.startPosition;
        }

        // console.log('resulting text node', newContent);
        // console.log('resulting selection', updatedSelection);
        blocks[start.id].content = [newContent];

        return { ...state, blocks, selection };
    };

    static deleteSelectionRange = (state, start, end) => {
        console.log("deleteSelectionRange");
        let { blocks: oldBlocks, selection: oldSelection } = state;
        let blocks = { ...oldBlocks };
        let selection = { ...oldSelection };

        let { startBlockId, endBlockId } = selection;
        let startParentBlock = blocks[startBlockId];
        let endParentBlock = blocks[endBlockId];

        if (startBlockId === endBlockId) {
            if (start.index === end.index) {
                // spanning single child
                let currentContent = blocks[start.id].content[0];

                let newContent =
                    currentContent.slice(0, start.position) +
                    currentContent.slice(end.position);
                blocks[start.id].content = [newContent];

                selection.startPosition = selection.startPosition;
                selection.endPosition = selection.startPosition;

                return { ...state, blocks, selection };
            } else {
                // spanning multiple children in the same block
                // delete (partial) first child
                let currentContent = blocks[start.id].content[0];

                let newContent = currentContent.slice(0, start.position);
                blocks[start.id].content = [newContent];

                start.index++;
                // delete in between
                while (start.index < end.index) {
                    let currBlockId = startParentBlock.content[start.index];
                    let newContent = "";
                    blocks[currBlockId].content = [newContent];
                    start.index++;
                }

                // delete (partial) last child
                let endContent = blocks[end.id].content[0];
                let newEndContent = endContent.slice(end.position);
                blocks[end.id].content = [newEndContent];
                selection.startPosition = selection.startPosition;
                selection.endPosition = selection.startPosition;

                return { ...state, blocks, selection };
            }
        }

        return state;
    };

    static cleanDanglingTextNodes = (state, start, end) => {
        console.log("cleanDanglingTextNodes");
        let { blocks, selection } = state;
        let updatedBlocks = { ...blocks };
        let updatedSelection = { ...selection };
        let { startBlockId } = updatedSelection;

        let parentBlock = { ...updatedBlocks[startBlockId] };
        let children = parentBlock.content;
        let markedForDeletion = children.filter(
            childId => updatedBlocks[childId].content[0].length === 0
        );
        let remaining = children.filter(
            childId => updatedBlocks[childId].content[0].length > 0
        );

        // console.log("markedForDeletion", markedForDeletion);
        if (markedForDeletion.length === children.length) {
            // console.log("keep an empty text node");
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
            let lastDeletedNodeId = parentBlock.content.findIndex(
                childId => childId === markedForDeletion[0]
            );
            if (lastDeletedNodeId === 0) {
                markedForDeletion.forEach((childId, i) => {
                    if (i === 0) {
                        return;
                    }
                    delete updatedBlocks[childId];
                });
                // console.log("keep an empty text node");
                // keep an empty text node
                parentBlock.content = [parentBlock.content[0], ...remaining];
                updatedSelection.startPosition = 0;
                updatedSelection.endPosition = 0;
            } else {
                parentBlock.content = remaining;
                markedForDeletion.forEach((childId, i) => {
                    delete updatedBlocks[childId];
                });
                // console.log("move to the previous node");
                // move to previous node
                let start = EditorState.computeEndPosition(
                    updatedBlocks,
                    parentBlock,
                    parentBlock.content[lastDeletedNodeId - 1]
                );
                updatedSelection.startPosition = start.position;
                updatedSelection.endPosition = start.position;
            }
            updatedBlocks[parentBlock.id] = parentBlock;
        }

        return { ...state, blocks: updatedBlocks, selection: updatedSelection };
    };
}

export default EditorState;
