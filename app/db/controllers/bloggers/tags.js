const tag = require('../../models').bloggers.tag;

module.exports = {
    create(req, res) {
        return tag
            .create({
                name: req.body.name,
            })
            .then(tag => res.status(201).send(tag))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return tag
            .all()
            .then(tags => res.status(200).send(tags))
            .catch(error => res.status(400).send(error));
    },
};