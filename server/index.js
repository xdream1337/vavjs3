const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;
const path = require('path');

app.use(express.json());
app.use(cors({ credentials: true }))
app.use(express.urlencoded({ extended: false })); // parser for HTML forms
app.use(express.static(__dirname + '../../client/build'));

//Routers
app.use('/auth', require('./routes/Users'));
app.use('/weight', require('./routes/Weight'));
app.use('/pressure', require('./routes/Pressure'));

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname + '../../client/build', 'index.html'))
})

const db = require('./models')

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});



