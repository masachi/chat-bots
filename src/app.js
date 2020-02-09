import ApiNotExistedException from "./exception/ApiNotExistedException";
import {SullaService} from "./services/SullaService";

// const Koa = require('koa');
// const app = new Koa();
// const json = require('koa-json');
// const bodyParser = require('koa-bodyparser');
// const routes = require('./routes');
// const requestHandler = require('./middleware/RequestHandler');
// const responseHandler = require('./middleware/ResponseHandler');

const sulla = require('sulla-hotfix');

//create client
sulla.create().then(client => {
    SullaService.getInstance().listenEvents(client)
});


// app.use(bodyParser());
// app.use(json());
//
// app.use(requestHandler);
// app.use(responseHandler);
//
// app.use(routes());//注册路由
//
// app.use(async (ctx, next) => {
//     throw new ApiNotExistedException();
// });
//
// let port = process.env.PORT || 3030;
// let server = app.listen(port);

