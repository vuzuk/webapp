const models = require(process.env.APP_ROOT + "/app/db/models");
const User = models.user;
const Blogger = models.blogger;


module.exports = (obj, cb) => {
    let modelToQuery = Blogger;
    if (!obj.isBlogger) {
        modelToQuery = User;
    }

    modelToQuery.findById(obj.id)
        .then((user_blogger) => {
            if (!user_blogger) {
                return cb("error");
            }
            user_blogger["isBlogger"] = obj.isBlogger;
            return cb(null, user_blogger);
        })
        .catch((err) => cb(err))
};