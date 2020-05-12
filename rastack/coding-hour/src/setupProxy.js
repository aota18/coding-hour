const proxy = require("http-proxy-middleware");

module.exports = function (app) {

    app.use(proxy("/api", {
        target: "http://13.209.70.185:3001", 
        changeOrigin:true,
        ws: true,
        router: {
            'localhost:3000': 'http://localhost:3001'
        }
    }));
   
}