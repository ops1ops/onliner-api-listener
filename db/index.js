import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const basename = path.basename(__filename);
const modelsPath = path.join(__dirname, 'models');
const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
);

sequelize.authenticate()
  .then(() => console.log('Connection to the DB has been established successfully'))
  .catch((err) => console.error('Unable to connect to the DB: ', err));

fs
  .readdirSync(modelsPath)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(modelsPath, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
sequelize.sync();
module.exports = db;
