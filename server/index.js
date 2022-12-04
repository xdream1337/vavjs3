const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

const db = require('./models')


db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});
