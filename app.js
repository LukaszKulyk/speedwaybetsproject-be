const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const playersResultsTableRoutes = require('./api/routes/playersResultsTable');
const standingsRoutes = require('./api/routes/standings');
const userRoutes = require('./api/routes/user');
const scheduleRoutes = require('./api/routes/schedule');
const BetRoutes = require('./api/routes/bet');

mongoose.connect(process.env.MONGO_ATLAS_CS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //can be restricted for example only 'http://speedway-bets.com' should have access
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//routes which handles the requests
app.use('/players', playersResultsTableRoutes);
app.use('/standings', standingsRoutes);
app.use('/user', userRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/bet', BetRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

/*app.use((req, res, next) => {
    res.status(200).json({
        message: 'Server is up and running.'
    });
});*/

module.exports = app;