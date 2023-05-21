//require express and mongoose 
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

//port server will run on
const PORT = process.env.PORT | 3001

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Now listening at ${PORT}`)
    })
});