import React from "react";
import { CompositeDecorator } from "draft-js";

const mdHeaderStrategy = (contentBlock, callback, contentState) => {
    const text = contentBlock.getText();
    if (text.startsWith("#")) {
        callback(0, text.length);
    }
};

const MdHeader = props => {
    return <h1>{props.children}</h1>;
};

const mdItalicStrategy = (contentBlock, callback, contentState) => {
    const regex = /_([^_]+)_/g;
    findWithRegex(regex, contentBlock, callback);
};

const MdItalic = props => {
    console.log(props.entityKey);
    return <em>{props.children}</em>;
};

const MdBold = props => {
    return <strong>{props.children}</strong>;
};

const mdBoldStrategy = (contentBlock, callback, contentState) => {
    const regex = /\*([^*]+)\*/g;
    findWithRegex(regex, contentBlock, callback);
};

const findWithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArr;
    while ((matchArr = regex.exec(text)) !== null) {
        let start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
};

const compositeDecorator = new CompositeDecorator([
    { strategy: mdHeaderStrategy, component: MdHeader },
    { strategy: mdItalicStrategy, component: MdItalic },
    { strategy: mdBoldStrategy, component: MdBold }
]);

export default compositeDecorator;
