const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;
const path = require('path');
const mysql = require('mysql2');

var db_conn = mysql.createConnection({
    user: 'newuser',
    password: 'rootroot123!',
    host: 'db',
    port: 3306
})

db_conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    db_conn.query("CREATE DATABASE IF NOT EXISTS express", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });

    db.sequelize.sync()
});

db_conn.query("INSERT IGNORE INTO express.Users (first_name, password, height, email, age, createdAt, updatedAt) VALUES ('admin', '$2b$13$V1bfq.dG.E7BCL/eQiyXrOAG9Wti9Kw/gSqBCZE3SVTlb8JTAW2k.', 180, 'admin@admin.com', 20, '2022-12-11 21:55:39', '2022-12-11 21:55:39')", function (err, result) {
    if (err) throw err;
    console.log("Admin created");
});

db_conn.query("INSERT IGNORE INTO express.Ads (src, href, count, createdAt, updatedAt) VALUES ('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2880px-Google_2015_logo.svg.png', 'https://www.google.com/', 0, '2022-12-11 21:55:39', '2022-12-11 21:55:39')", function (err, result) {
    if (err) throw err;
    console.log("Ad1 created");
});

app.use(express.json());
app.use(cors({ credentials: true }))
app.use(express.urlencoded({ extended: false })); // parser for HTML forms
app.use(express.static(__dirname + '../../client/build'));

//Routers
app.use('/auth', require('./routes/Users'));
app.use('/weight', require('./routes/Weight'));
app.use('/pressure', require('./routes/Pressure'));
app.use('/ad', require('./routes/AdRoute'));


// fix cannot get /URL
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../../client/build/index.html'));
});

const db = require('./models')


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});



