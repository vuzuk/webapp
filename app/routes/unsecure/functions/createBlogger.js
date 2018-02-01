const path = require("path");
const models = require(path.join(process.env.APP_ROOT,"db/models"));
const Blogger = models.blogger;

module.exports = (req, res) => {
     newBlogger = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob,              // "yyyy-MM-dd"
        gender: req.body.gender,        // 'M' or 'F'
        email: req.body.email,
        contact: req.body.contact
    };

    return Blogger
        .create(newBlogger)
        .then(blogger => res.status(201).send(blogger))
        .catch(error => res.status(400).send(error));
};