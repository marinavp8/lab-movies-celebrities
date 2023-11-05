require('dotenv/config');
require('./db');

const express = require('express');
const app = express();
const hbs = require('hbs');


require('./config')(app);

app.locals.title = `movies-celebrities`;

const indexRoutes = require('./routes/index.routes');
app.use('/', indexRoutes);

const celebritiesRoute = require("./routes/celebrities.routes")
app.use("/celebrities", celebritiesRoute)

const moviesRoute = require("./routes/movies.routes")
app.use("/movies", moviesRoute)

require('./error-handling')(app);

module.exports = app;
