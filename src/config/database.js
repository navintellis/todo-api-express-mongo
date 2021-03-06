// require mongoose
const mongoose = require('mongoose');
const chalk = require('chalk');
const dbUrl = require('./properties').DB;

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

module.exports=function () {
    mongoose.connect(dbUrl);
    mongoose.connection.on('connected', () => {
       console.log(connected("Mongoose default connection is open to ", dbUrl)); 
    });
    mongoose.connection.on('error', (err) => {
        console.log(error(`Mongoose default connection has occurred ${err} error`));
    });
    mongoose.connection.on('disconnected', () => {
        console.log(disconnected("Mongoose default connection is disconnected"));
    });
    process.on('SIGINT', () => {
        console.log(termination("Mongoose default connection is disconnected to due to application termination"));
        process.exit(0);
    });

}
