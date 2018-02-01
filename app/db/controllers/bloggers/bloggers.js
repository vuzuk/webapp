const blogger = require('../../models').blogger;

module.exports = {
    create(req, res) {
        return blogger
            .create({
                username: req.body.username,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                dob: req.body.dob,              // "yyyy-MM-dd"
                gender: req.body.gender,        // 'M' or 'F'
                email: req.body.email,
                contact: req.body.contact
            })
            .then(blogger => res.status(201).send(blogger))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return blogger
            .all()
            .then(bloggers => res.status(200).send(bloggers))
            .catch(error => res.status(400).send(error));
    },
};