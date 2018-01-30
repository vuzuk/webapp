const blogger = require('../../models').bloggers.blogger;

module.exports = {
    create(req, res) {
        return blogger
            .create({
                name: req.body.name,
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },
};