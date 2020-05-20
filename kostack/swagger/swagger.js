const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-koa');
const convert = require('koa-convert');
const mount = require('koa-mount');


const options = swaggerJSDoc({
 
    swaggerDefinition: {
        info: {
            title: 'Coding Hour',
            description: 'API Server',
            version: '1.0.0',
        },

  
        host: 'localhost:3001',
        basePath: '/api',
        schemes: ['http'],
    },

    // 페이지에서 보여줄 API들에 대한 경로이다.
    // .yaml로 작성해도 되고, .js에 @swagger 형식으로 주석으로 추가해도 된다.
    // .js보단 .yaml로 작성하는 걸 추천한다. 들여쓰기로 작성해야 하는데 .js는 들여쓰기를 자동으로 해주지 않는다.
    apis: ['./parameters.yaml'],
});

export const swaggerConfig = (app) => {
    app.use(swaggerUI.serve);
    app.use(convert(mount('/api-docs', swaggerUI.setup(options))));
};