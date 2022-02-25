let mysql = require('mysql2')
require('dotenv').config();
const http = require('http');
const url = require('url');
const fs = require('fs');

let queryResult;
let msg = [];

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:process.env.DB_PASSWORD,
    multipleStatements:true,
    database:'nodejs_test',
});







http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  const path = url.parse(request.url, true).pathname; // url에서 path 추출
  if (request.method === 'GET') { // GET 요청이면
    if (path === '/') { // 주소가 /이면
    response.writeHead(200,{'Content-Type':'Application/json'});
    response.end(JSON.stringify(queryResult));
    // response.end(templateHTML(), 'utf-8');
    } else { // 매칭되는 주소가 없으면
      response.statusCode = 404; // 404 상태 코드
      response.end('주소가 없습니다');
    }
  } else if(request.method === 'POST'){
    response.writeHead(200,{'Content-Type':'Application/json'});
    request.on('data',chunck => {
      msg = JSON.parse(chunck.toString())["data"];
      const query = 'INSERT INTO board(msg) VALUES(?);SELECT * FROM board;';
      connection.query(query,[msg],function (error, results, fields){
        if (error) throw error;
        queryResult = results[1];
        console.log(queryResult);
        response.end(JSON.stringify(queryResult));
      });
      
    })
  }
}).listen(8080);


// connection.end();

      

