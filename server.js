var express = require('express');
var mysql = require('mysql');
var multer = require('multer');

var app = express();
var upload = multer();

var connection = mysql.createConnection({
        host    : 'localhost',
        user    : 'root',
        password: 'digh3484',
        port    : '3306',
        database: 'culture'
});

connection.connect(function(err){
    if(err){
        console.log('DB connection failed.');
        exit();
    } else{
        console.log('DB connection succeeded.');
    }
});


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
app.post('/follow', upload.any(), function (req, res) {
        var leader = req.body.leader;
        var follower = req.body.follower;

        connection.query('INSERT INTO followers VALUES ("' + leader +'","'+ follower + '")', function(err, rows, fields){
                if(!err){
                    res.send('ok');
                } else {
                    res.send('db_error');
                }
        });
});


app.post('/follow_cancel', upload.any(), function (req, res) {
        var leader = req.body.leader;
        var follower = req.body.follower;

        connection.query('DELETE FROM followers WHERE leader = "' + leader + '" AND follower = "' + follower + '"', function(err, rows, fields){
                if(!err){
                    res.send('ok');
                } else {
                    res.send('db_error');
                }
        });
});

app.listen(8001, function () {
        console.log('Server is listening on port 8001');
});
