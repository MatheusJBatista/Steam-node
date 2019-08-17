const express = require('express')
const app = express()
const steam = require('steam-login')
const consign = require('consign')
const dotenvConfigLoad = require("dotenv/config")

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }));
app.use(steam.middleware({
    realm: 'http://localhost:5000/',
    verify: 'http://localhost:5000/verify',
    apiKey: process.env.STEAM_KEY}
));
app.use(express.static('./app/views/public'));

consign()
  .include('app/routes')
  .then('config/dbConnection.js')
  .then('config/createTables.js')
  .then('app/model')
  .into(app);

module.exports = app;
