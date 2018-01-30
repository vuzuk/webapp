const bloggers = require("./bloggers/bloggers");
const blogs = require("./bloggers/blogs");
const categories = require("./bloggers/categories");
const tags = require("./bloggers/tags");
const comments = require("./users/comments");
const followers = require("./users/followers");
const users = require("./users/users");

module.exports = {
    bloggers: {
        bloggers,
        blogs,
        categories,
        tags
    }, users: {
        comments,
        followers,
        users
    },
};