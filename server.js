var express = require('express');
var mysql = require('mysql');
var multer = require('multer');

var connection = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: 'digh3484',
        port    : '3306',
        database: 'culture'
});

var app = express();
var upload = multer();

app.post('/sign_up', upload.any(), function (req, res) {
    var id = req.body.id;
    var pw = req.body.pw;
    var name = req.body.name;
    var phone = req.body.phone;
    var mail = req.body.mail;

    connection.query('INSERT INTO users VALUES ("' + id +'","'+ pw +'","'+ name +'","'+ phone +'","'+ mail + '")', function(err, rows, fields){
            if(!err){
                    res.send('ok');
            } else {
                    res.send('exist_id');
            }
    });
});

app.post('/sign_in', upload.any(), function (req, res) {
        var id = req.body.id;
        var pw = req.body.pw;

        connection.query('SELECT pw FROM users WHERE id = "' + id +'"', function(err, rows, fields){
                if(!err){
                        if(rows.length == 0){
                                res.send('no_id');
                        } else {
                                if(pw == rows[0].pw){
                                        res.send('ok');
                                } else {
                                        res.send('wrong_pw');
                                }
                        }

                } else {
                        console.log(err);
                        res.send('db_error');
                }
        });
});

app.listen(8001, function () {
        console.log('Server is listening on port 8001');
});
