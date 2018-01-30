const comment = require('../../models').users.comment;

module.exports = {
    create(req, res) {
        return comment
            .create({
                name: req.body.name,
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },
};