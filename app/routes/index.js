const express = require("express");
const Router = express.Router;
const route = Router();
const mailTransporter = require("./functions/configEmail");
const passport = require("./passport")(route);
const routes = {
    api: {
        admin: require("./admin"),
        auth: require("./auth")(passport, mailTransporter),
        secure: require("./secure"),
        unSecure: require("./unsecure")
    },
    react: require("./react")
};

route.use(function (req, res, next) {
    try {
        req.body = JSON.parse(Object.keys(req.body)[0]);
    } catch (err) {
        // req.body = req.body
    }
    next();
});

route.get('/api', function (req, res) {
    return res.json({status: true, msg: 'hey you! go ahead :)'});
});
route.use('/api/auth', routes.api.auth);
route.use('/api/secure', routes.api.secure);
route.use('/api/unsecure', routes.api.unSecure);
route.use('/images', express.static(process.env.APP_ROOT + "/app/db/uploads/images"));
route.use('/', routes.react);

const FroalaEditor = require(process.env.APP_ROOT + '/externals/wysiwyg-editor/lib/froalaEditor.js');
route.post('/froala_upload',(req,res) => {
    FroalaEditor.Image.upload(req, "../app/db/uploads/images/bloggers/", function(err, data) {
        // Return data.
        if (err) {
            return res.status(400).send(JSON.stringify(err));
        }
        data.link = data.link.substr(17,data.link.length)
        return res.status(200).send(data);
    });
})

module.exports = route;