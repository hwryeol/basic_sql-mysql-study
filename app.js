let mysql = require('mysql')
require('dotenv').config();

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:process.env.DB_PASSWORD,
    multipleStatements:true,
    database:'my_db',
});
const query = "INSERT INTO board(msg) VALUES(?)"
const msg = "hello world";

connection.query(query,msg,function (error, results, fields){
    if (error) throw error;
    console.log('The solution is: ', results);
});

connection.end();