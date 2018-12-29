'use strict'

import User from "~/src/models/user";

module.exports.up = function (next) {
  return User.create({
    username: "superuser",
    password: "superuser"
  })
    .then(() => next());
}

module.exports.down = function (next) {
  User.deleteMany({})
    .exec()
    .then(() => next());
}
