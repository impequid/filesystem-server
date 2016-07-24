// import external

import 'babel-polyfill';
import koa from 'koa';
import http from 'http';

// import internal

import router from './routes';
import config from './config';

// setup koa

const app = koa();
const server = http.Server(app.callback());

// routes

app.use(router.routes(), router.allowedMethods());

// start server

server.listen(config.listen.port, config.listen.address);

server.on('listening', () => {
	console.log(`listening on http://${config.listen.address}:${config.listen.port}`)
});
