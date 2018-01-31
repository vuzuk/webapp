const follower = require('../../models').users.follower;

module.exports = {
    create(req, res) {
        return follower
            .create({
                name: req.body.name,
            })
            .then(follower => res.status(201).send(follower))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return follower
            .all()
            .then(followers => res.status(200).send(followers))
            .catch(error => res.status(400).send(error));
    },
};