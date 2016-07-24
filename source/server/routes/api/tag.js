// import external

import koaRouter from 'koa-router';
import koaBody from 'koa-body';

// import internal

import actions from '../../actions';
import {login} from '../../utilities/middleware';

// routes

const router = koaRouter();
const body = koaBody();

/**
 * @description
 * @http GET /api/v1.0/tags
 */
router.get('s/', login, function * () {
	this.set('X-Encryption', 'AES');
	this.body = {
		"0": {
			name: "work",
			color: "FF0000"
		}, "1": {
			name: "home",
			color: "00FF00"
		}
	};
});

// export

export default router;
