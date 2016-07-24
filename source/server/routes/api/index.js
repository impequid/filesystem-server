// import external

import koaRouter from 'koa-router';

// import internal

import rFile from './file';
import rFolder from './folder';
import rTag from './tag';

// routes

const router = koaRouter();

router.use('/folder', rFolder.routes(), rFolder.allowedMethods());
router.use('/file', rFile.routes(), rFile.allowedMethods());
router.use('/tag', rTag.routes(), rTag.allowedMethods());

// export

export default router;
