// config/database.js
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'null',
    database: 'route'
  }
});
var Bookshelf = require('bookshelf')(knex);

module.exports.DB = Bookshelf;
