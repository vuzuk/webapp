module.exports = (app) => {
    const passport = require('passport');
    const passportLocal = require('passport-local');
    const session = require('express-session');
    const MySQLStore = require('express-mysql-session')(session);
    const LocalStrategy = passportLocal.Strategy;


    const dbConf = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
    };
    const sessionStore = new MySQLStore(dbConf);

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, function (email, password, done) {
        console.log("Checking credentials");

        // modify after this line to adapt to our database ************************
        // database.usersTable.getUsersByIdentity({
        //     email: email,
        //     password: password
        // }, ["id", "email", "fullName"], function (result) {
        //     if (!result[0]) {
        //         console.log("Invalid email or password");
        //         done(null, false, {message: "Invalid email or password"})
        //     }
        //     else {
        //         console.log("successfully logged in");
        //         done(null, result[0], {message: "SUCCESS"})
        //     }
        // })
    }));

    app.use(session({
        secret: process.env["SECRET"],
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, cb) {
        // modify after this line to adapt to our database ************************
        return cb(null, {
            id: user.id,
        });
    });
    passport.deserializeUser(function (user, cb) {
        // modify after this line to adapt to our database ************************
        //get all details of user from database
        // db.users_table.getUsersDetails({id: user['id']}, ['*'], function (err, result) {
        //     if (err) {
        //         return cb(err, null);
        //     }
        //     if (result.length === 0) {
        //         return cb("error", null);
        //     }
        //     return cb(null, result[0]);
        // });
    });

    return passport;
};
