const follower = require('../../models').users.follower;

module.exports = {
    create(req, res) {
        return follower
            .create({
                name: req.body.name,
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },
};