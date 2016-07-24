// import external

import koaRouter from 'koa-router';

// import internal

import apiRouter from './api';

// routes

const router = koaRouter();

router.get('*', function * (next) {
	console.log(this.path);
	yield next;
});

router.use('/api/v1.0', apiRouter.routes(), apiRouter.allowedMethods());

// export

export default router;
