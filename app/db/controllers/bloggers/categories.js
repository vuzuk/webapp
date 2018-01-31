const category = require('../../models').bloggers.category;

module.exports = {
    create(req, res) {
        return category
            .create({
                name: req.body.name,
            })
            .then(category => res.status(201).send(category))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return category
            .all()
            .then(categories => res.status(200).send(categories))
            .catch(error => res.status(400).send(error));
    },
};