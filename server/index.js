const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false })); // parser for HTML forms
//server.use(express.static(__dirname + '/public'));

const db = require('./models')

//Routers
app.use('/users', require('./routes/Users'));

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});
