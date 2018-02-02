const path = require("path");
const models = require(path.join(process.env.APP_ROOT,"/app/db/models"));
const Blogger = models.user;

module.exports = (req, res) => {
     newUser = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob,              // "yyyy-MM-dd"
        gender: req.body.gender,        // 'M' or 'F'
        email: req.body.email,
        contact: req.body.contact
    };

    return User
        .create(newUser)
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
};