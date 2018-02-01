const user = require('../../models').users.user;

module.exports = {
    create(req, res) {
        return user
            .create({
                name: req.body.name,
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return user
            .all()
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    getOne(req, res, cb) {
        email = req.body.email, username = req.body.username, password = req.body.password;
        whereObj = {password: req.body.password};
        req.body.email ? whereObj['email'] = email : whereObj['username'] = username;

        return user
            .findOne({
                where: whereObj,
                attributes: ['id']
            })
    }
};