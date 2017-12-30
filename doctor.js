const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database/database');
const dbIntegrity = require('./public/dataIntegrity');


const router = express.Router();
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));