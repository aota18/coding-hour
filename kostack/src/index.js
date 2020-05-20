require('dotenv').config(); // Load env from .env

const Koa = require('koa');
const Router = require('koa-router');


const app = new Koa();
const router = new Router();
const api = require('./api');
const cors = require('koa-cors');
const port = process.env.PORT || 3001;

const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

const swagger = require('swagger-koa');


const { jwtMiddleware } = require('lib/token');

// Use Node's native Promise
mongoose.Promise = global.Promise;

// Mongo DB Connection
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(
    (res) => {
        console.log('✅ Connected to Mongodb ')
    }
).catch(e=> {
    console.error(e);
})

const corsOptions = {
    credentials: true
  }

app.proxy = true;
app.use(cors(corsOptions));
app.use(bodyParser()); // It should be above Rotuer code.
app.use(jwtMiddleware);
router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());

app.use(swagger.init({
  apiVersion: '1.0',
  swaggerVersion: '1.0',
  swaggerURL: '/api-docs',
  swaggerUI: '/api-docs',
  basePath: 'http://localhost:3001/',
  info: {
    title: 'Coding hour API Docs',
    description: ''
  },
  apis: ['./swagger/parameters.yml']
}));

app.listen(port, () => {
    console.log(`✅ Coding Hour API Server is listening to port ${port}`);
})