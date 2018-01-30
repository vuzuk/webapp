const user = require('../../models').users.user;

module.exports = {
    create(req, res) {
        return user
            .create({
                name: req.body.name,
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },
};