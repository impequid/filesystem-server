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
 * @description file metadata
 * @http HEAD /api/v1.0/file/:id
 */
router.head('/:id', login, function * () {

	const {id} = this.params;

	setHeaders(this);

	this.status = 200;
});

/**
 * @description file content and metadata
 * @http GET /api/v1.0/file/:id
 */
router.get('file', '/:id', login, function * () {

	const {id} = this.params;

	setHeaders(this);

	this.body = 'placeholder';
});

router.post('/', login, body, function * () {
	const id = 'r4nd0m1d';
	const {name, parent} = this.request.body;
	this.set('Location', router.url('file', id));
	this.status = 201;
});

/**
 * @description deletes a file
 * @http DELETE /api/v1.0/file/:id
 */
router.delete('/:id', login, body, function * () {

	const {id} = this.params;
	const {user} = this;

	this.body = 'placeholder';

});

// helper Methods

function setHeaders (k) {
	k.set('X-Created', '12345678');
	k.set('X-Encryption', 'AES');
	k.set('X-Modified', '12345678');
	k.set('X-Name', 'place.holder');
	k.set('X-Path', '/place/holder');
	k.set('X-Permissions', 'placeholder');
	k.set('X-Tags', 'placeholder');
}

// export

export default router;
