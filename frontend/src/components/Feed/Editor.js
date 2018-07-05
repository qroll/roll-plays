import React from "react";
import styled from "styled-components";
import stringify from "stringify-entities";

import Header1 from "./components/Header1";
import Block from "./components/Block";

const TextArea = styled.div`
    background-color: #fff;
    border: 1px solid #e0e0e0;
    padding: 10px;

    ${props => (props.focus ? "border: 1px solid #f07241;" : null)};
`;

const uuid = () => {
    return Date.now();
};

const insertAfter = (arr, element, index) => {
    return [...arr.slice(0, index + 1), element, ...arr.slice(index + 1)];
};

class EditorState {
    static init() {
        let newId = uuid();
        return {
            blocks: {
                [newId]: {
                    id: newId,
                    content: "omg wjasasd",
                    inline: false
                }
            },
            order: [newId],
            currentBlock: newId,
            startBlock: newId,
            endBlock: newId,
            selectionState: {
                startNodeOffset: [0],
                startOffset: 0,
                endNodeOffset: [0],
                endOffset: 0
            }
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
        let { currentBlock, selectionState } = this.state;
        console.log("componentDidUpdate - currentBlock", currentBlock);
        // console.log("componentDidUpdate - order", this.state.order);
        console.log("componentDidUpdate - startBlock", this.state.startBlock);
        console.log("componentDidUpdate - selectionState", selectionState);

        if (!currentBlock) {
            return;
        }

        if (!selectionState) {
            let selectionObj = window.getSelection();
            selectionObj.removeAllRanges();
            let range = document.createRange();
            range.setStart(this.refs[currentBlock], 0);
            range.setEnd(this.refs[currentBlock], 0);
            selectionObj.addRange(range);
            return;
        }

        // console.log("getNodeFromOffset", selectionState.startNodeOffset);

        let node = this.getNodeFromOffset(
            selectionState.startNodeOffset,
            this.refs[currentBlock]
        );
        console.log("the node is", node);
        if (!node) {
            // console.log("just focus this", this.refs[currentBlock]);
            // this.refs[currentBlock].focus();
            let selectionObj = window.getSelection();
            selectionObj.removeAllRanges();
            let range = document.createRange();
            range.setStart(this.refs[currentBlock], 0);
            range.setEnd(this.refs[currentBlock], 0);
            selectionObj.addRange(range);
        } else {
            let selectionObj = window.getSelection();
            selectionObj.removeAllRanges();
            let range = document.createRange();
            range.setStart(node, selectionState.startOffset);
            range.setEnd(node, selectionState.endOffset);
            selectionObj.addRange(range);
        }
    }

    findNodeOffset = (selection, anchorNode, node) => {
        if (!node) {
            return [];
        }
        let childNodes = node.childNodes;
        if (!childNodes) {
            return [];
        }
        for (let i = 0; i < childNodes.length; i++) {
            if (anchorNode.isSameNode(childNodes[i])) {
                return [i];
            } else if (selection.containsNode(childNodes[i])) {
                return [
                    i,
                    ...this.findNodeOffset(selection, anchorNode, childNodes[i])
                ];
            }
        }
        return [];
    };

    getNodeFromOffset = (nodeOffset, node) => {
        if (!nodeOffset) {
            return null;
        }
        if (nodeOffset.length === 0) {
            return null;
        }
        let i = nodeOffset[0];
        if (nodeOffset.length === 1) {
            return node.childNodes[i];
        }
        return this.getNodeFromOffset(nodeOffset.slice(1), node.childNodes[i]);
    };

    calculateSelection = (selection, event, blockId) => {
        let startSelectedBlock = this.refs[this.state.startBlock];
        let endSelectedBlock = this.refs[this.state.endBlock];
        let anchorNode = selection.anchorNode;

        if (!selection.rangeCount) {
            return {};
        }

        let startContainer = selection.getRangeAt(0).startContainer;
        let startOffset = selection.getRangeAt(0).startOffset;
        let endContainer = selection.getRangeAt(0).endContainer;
        let endOffset = selection.getRangeAt(0).endOffset;
        let textLength = endContainer.textContent.length;

        if (!startSelectedBlock || !anchorNode) {
            return {};
        }

        let selectionState = {
            startNodeOffset: this.findNodeOffset(
                selection,
                startContainer,
                startSelectedBlock
            ),
            endNodeOffset: this.findNodeOffset(
                selection,
                endContainer,
                endSelectedBlock
            ),
            startOffset,
            endOffset,
            textLength
        };

        // console.log("calculateSelection", selectionState);

        return selectionState;
    };

    handleOnInput = (event, blockId) => {
        console.log("handleOnInput");
        event.preventDefault();
        let value = this.refs[blockId].textContent;
        let selectionObj = window.getSelection();
        let selectionState = this.calculateSelection(
            selectionObj,
            event,
            blockId
        );
        this.setState(prevState => {
            let updatedBlock = {
                ...prevState.blocks[blockId],
                content: value
            };
            if (value.length <= 0) {
                updatedBlock.type = undefined;
            }
            if (value.startsWith("# ") && !updatedBlock.type) {
                updatedBlock.type = "Header1";
                updatedBlock.content = value.substring(1);
                selectionState.startOffset = Math.max(
                    selectionState.startOffset - 1,
                    0
                );
                selectionState.endOffset = Math.max(
                    selectionState.endOffset - 1,
                    0
                );
            }
            return {
                blocks: {
                    ...prevState.blocks,
                    [blockId]: updatedBlock
                },
                selectionState
            };
        });
    };

    handleOnSelect = (event, blockId) => {
        console.log("handleOnSelect");
        let selectionObj = window.getSelection();
        let selectionState = this.calculateSelection(
            selectionObj,
            event,
            blockId
        );
        this.setState(prevState => {
            return {
                currentBlock: blockId,
                selectionState
            };
        });
    };

    handleOnMouseDown = (event, blockId) => {
        console.log("handleOnMouseDown", blockId);
        let selectionObj = window.getSelection();
        let selectionState = this.calculateSelection(
            selectionObj,
            event,
            blockId
        );
        this.setState({
            currentBlock: blockId,
            startBlock: blockId,
            endBlock: blockId,
            selectionState
        });
    };

    handleOnMouseUp = (event, blockId) => {
        console.log("handleOnMouseUp", blockId);
        let selectionObj = window.getSelection();
        let selectionState = this.calculateSelection(
            selectionObj,
            event,
            blockId
        );
        this.setState({
            currentBlock: blockId,
            startBlock: blockId,
            endBlock: blockId,
            selectionState
        });
    };

    handleOnKeyPress = (event, blockId) => {
        console.log("handleOnKeyPress");
        if (event.key === "Enter") {
            event.preventDefault();
            let currBlock = { ...this.state.blocks[blockId] };
            let currValue = currBlock.content;
            currBlock.content = currValue.slice(
                0,
                this.state.selectionState.startOffset || 0
            );
            let index = this.state.order.findIndex(id => id === blockId);
            let newId = uuid();
            let newBlock = {
                id: newId,
                content:
                    currValue.slice(this.state.selectionState.endOffset) + ""
            };
            // console.log("currBlock", currBlock);
            // console.log("newBlock", newBlock);
            this.setState(prevState => {
                let updatedOrder = insertAfter(prevState.order, newId, index);
                return {
                    blocks: {
                        ...prevState.blocks,
                        [blockId]: currBlock,
                        [newId]: newBlock
                    },
                    order: updatedOrder,
                    currentBlock: newId,
                    startBlock: newId,
                    endBlock: newId,
                    selectionState: {
                        startNodeOffset: [0],
                        startOffset: 0,
                        endNodeOffset: [0],
                        endOffset: 0
                    }
                };
            });
        } else {
            // this.handleOnKeyDown(event, blockId);
            // let selectionObj = window.getSelection();
            // let selectionState = this.calculateSelection(
            //     selectionObj,
            //     event,
            //     blockId
            // );
            // this.setState({
            //     currentBlock: blockId,
            //     selectionState
            // });
        }
    };

    handleOnKeyDown = (event, blockId) => {
        console.log("handleOnKeyDown");

        // move caret to previous or next block
        // console.log("###", event.key, event.keyCode);
        let nextPosition = -1;
        if (event.key === "ArrowUp") {
            let index = this.state.order.findIndex(block => block === blockId);
            nextPosition = Math.max(0, index - 1);
        }
        if (event.key === "ArrowDown") {
            let index = this.state.order.findIndex(block => block === blockId);
            nextPosition = Math.min(this.state.order.length - 1, index + 1);
        }
        if (nextPosition >= 0) {
            let nextBlockId = this.state.order[nextPosition];
            let selectionObj = window.getSelection();
            let currentSelectionState = this.calculateSelection(
                selectionObj,
                event,
                blockId
            );
            let selectionState = {
                startNodeOffset: [0],
                endNodeOffset: [0],
                startOffset: currentSelectionState.startOffset,
                endOffset: currentSelectionState.startOffset
            };
            this.setState({
                currentBlock: nextBlockId,
                startBlock: nextBlockId,
                endBlock: nextBlockId,
                selectionState
            });
            return;
        }

        let selectionObj = window.getSelection();
        let selectionState = this.state.selectionState;
        if (event.key === "ArrowLeft") {
            if (selectionState.startOffset > 0) {
                selectionState.startOffset -= 1;
                selectionState.endOffset = selectionState.startOffset;
            } else if (selectionState.startNodeOffset.length > 0) {
                let lastIndex = selectionState.startNodeOffset.length - 1;
                if (selectionState.startNodeOffset[lastIndex] > 0) {
                    selectionState.startNodeOffset[lastIndex] =
                        selectionState.startNodeOffset[lastIndex] - 1;
                    selectionState.endNodeOffset[lastIndex] =
                        selectionState.startNodeOffset[lastIndex];
                } else if (selectionState.startNodeOffset[lastIndex] === 0) {
                    selectionState.startNodeOffset.splice(lastIndex, 1);
                    selectionState.endNodeOffset =
                        selectionState.startNodeOffset;
                }
            }
        }
        if (event.key === "ArrowRight") {
        }
        this.setState({
            currentBlock: blockId,
            startBlock: blockId,
            endBlock: blockId,
            selectionState
        });
    };

    mapBlockTypeToComponent(block) {
        switch (block.type) {
            case "Header1":
                return Header1;
            default:
                return Block;
        }
    }

    render() {
        // console.log(this.state);
        return (
            <TextArea>
                <div
                    contentEditable
                    suppressContentEditableWarning
                    onInput={event =>
                        this.handleOnInput(event, this.state.currentBlock)
                    }
                    onKeyPress={event =>
                        this.handleOnKeyPress(event, this.state.currentBlock)
                    }
                    onKeyDown={event =>
                        this.handleOnKeyDown(event, this.state.currentBlock)
                    }
                    // onSelect={event =>
                    //     this.handleOnSelect(event, this.state.currentBlock)
                    // }
                >
                    {this.state.order.map(blockId => {
                        let block = this.state.blocks[blockId];
                        let Component = this.mapBlockTypeToComponent(block);
                        return (
                            <Component
                                key={block.id}
                                inline={block.inline}
                                // onInput={event =>
                                //     this.handleOnInput(event, block.id)
                                // }
                                // onKeyPress={event =>
                                //     this.handleOnKeyPress(event, block.id)
                                // }
                                // onKeyDown={event =>
                                //     this.handleOnKeyDown(event, block.id)
                                // }
                                // onSelect={event =>
                                //     this.handleOnSelect(event, block.id)
                                // }
                                onMouseDown={event =>
                                    this.handleOnMouseDown(event, block.id)
                                }
                                onMouseUp={event =>
                                    this.handleOnMouseUp(event, block.id)
                                }
                                innerRef={input => {
                                    this.refs = {
                                        ...this.refs,
                                        [block.id]: input
                                    };
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: stringify(block.content)
                                }}
                            />
                        );
                    })}
                </div>
            </TextArea>
        );
    }
}

export default Editor;
