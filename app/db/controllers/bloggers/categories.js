const category = require('../../models').bloggers.category;

module.exports = {
    create(req, res) {
        return category
            .create({
                name: req.body.name,
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },
};