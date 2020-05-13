var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport =require('passport');
var mongoose = require('mongoose');
var routesApi = require('./routes/index');
var app = express();
const fs = require('fs');

const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');



///////////////////////
/* Swaggar Definition*/
///////////////////////


var swaggerDefinition = {
    info: { // API informations (required)
      title: 'Coding Hour Project', // Title (required)
      version: '1.0.0', // Version (required)
      description: '', // Description (optional)
    },
    host: 'localhost:3001', // Host (optional)
    basePath: '/api', // Base path (optional
  }


  // Options for the swagger docs
  var options = {
    // Import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/index.js', './swagger/parameters.yaml'],
  }
  

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//////////////////////
/*Connect to MongoDB*/
//////////////////////
let dbCredential;
try { 
    dbCredential = JSON.parse(fs.readFileSync(".secret/.db.secret", "utf8"));
}
catch (error) {
    console.error(error);
}

const db=`mongodb+srv://${dbCredential.db_access}:${dbCredential.db_password}@coding-hour-hl5gw.mongodb.net/${dbCredential.db_name}`;

mongoose.connect(db, {
  useNewUrlParser:true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to Mongodb ');
}).catch(err => {
  console.error('🚫 Error : ' + err);
})

///////////////////////
/* view engine setup */
///////////////////////

app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


///////////////////////
/*     Passport      */
///////////////////////

require('./config/passport');
app.use(passport.initialize());


///////////////////////
/*     Routing       */
///////////////////////
app.use('/api', routesApi);



var port = '3001';
app.set('port', port);
app.listen(port, "0.0.0.0", () => console.log(`✅ Server listening on ${port}`));

module.exports = app;

