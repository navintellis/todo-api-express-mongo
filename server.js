const express=require('express');
const bodyParser = require('body-parser');
const log = require('morgan')('dev');

const {PORT}=require('./config');
const db=require('./src/utils/database');

const pagesRouter=require('./src/page/pages.routes');
const app = express();

// configure body-parser
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

// initialize express router
const router = express.Router();

// call the database connectivity function
db();

// configure app.use()
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Error handling
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT")
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin, Accept, X-Requested-Width, Content-Type, Access-Control-Allow-Methods, Access-Control-Request-Headers,Authorization");
    next();
})

// use express router
app.use('/api', router);
// call heros routing
pagesRouter(router);

app.listen(PORT, (req, res) => {
    console.log(`Server is running on ${PORT} port.`);
})