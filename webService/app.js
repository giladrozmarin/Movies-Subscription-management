const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/index')
//DB
require('./configs/database');
//init db 


// configure the body-parser
// to accept urlencoded bodies
// and json data
app.use(bodyParser.urlencoded({ extended: true }))  
   .use(bodyParser.json());

app.use('/', indexRoutes);
app.listen(3001);