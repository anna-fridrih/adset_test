const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.db.url, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { require: true } : false
  }
});


module.exports = {
  sequelize,
  connect: async () => {
    try {
      await sequelize.authenticate();
      console.log('PostgreSQL connected');
    } catch (error) {
      console.error('PostgreSQL connection error:', error);
      process.exit(1);
    }
  }
};