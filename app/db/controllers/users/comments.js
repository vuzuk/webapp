const comment = require('../../models').users.comment;

module.exports = {
    create(req, res) {
        return comment
            .create({
                name: req.body.name,
            })
            .then(comment => res.status(201).send(comment))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return comment
            .all()
            .then(comments => res.status(200).send(comments))
            .catch(error => res.status(400).send(error));
    },
};