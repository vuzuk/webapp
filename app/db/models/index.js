const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'DEVELOPMENT';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {
    bloggers: {},
    users: {}
};

let sequelize;
// let penv = process.env
if (config.use_env_variable) {
    config.logging = console.log;
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database, config.username, config.password, config
    );
}

// Reading bloggers models
fs
    .readdirSync(path.join(__dirname, 'bloggers'))
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, 'bloggers', file));
        db['bloggers'][model.name] = model;
    });

// Reading users models
fs
    .readdirSync(path.join(__dirname, 'users'))
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, 'users', file));
        db['users'][model.name] = model;
    });


Object.keys(db).forEach(modelFolder => {
    Object.keys(db[modelFolder]).forEach(modelName => {
        if (db[modelFolder][modelName].associate) {
            db[modelFolder][modelName].associate(db);
        }
    });
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;