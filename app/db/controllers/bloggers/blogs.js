const blog = require('../../models').bloggers.blog;

module.exports = {
    create(req, res) {
        return blog
            .create({
                name: req.body.name,
            })
            .then(blog => res.status(201).send(blog))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return blog
            .all()
            .then(blogs => res.status(200).send(blogs))
            .catch(error => res.status(400).send(error));
    },
};