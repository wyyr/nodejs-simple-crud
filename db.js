const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_simplecrud'
})

connection.connect(err => {
    if (err) return new Error(err);
    console.log('mysql connection true')
});

module.exports = connection;