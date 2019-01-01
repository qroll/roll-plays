"use strict";

import Post from "~/src/models/post";

module.exports.up = function(next) {
    return Promise.resolve().then(() => next());
};

module.exports.down = function(next) {
    return Post.deleteMany()
        .exec()
        .then(() => next());
};
