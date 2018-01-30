const blog = require('../../models').bloggers.blog;

module.exports = {
    create(req, res) {
        return blog
            .create({
                name: req.body.name,
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },
};