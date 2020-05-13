var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const fs = require('fs');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();


//Connect to MongoDB

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
// view engine setup
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', (req, res) => {
  return res.json({username: 'Daniel'})
});




var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);


app.listen(port, "0.0.0.0", () => console.log(`✅ Server listening on ${port}`));

module.exports = app;


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
