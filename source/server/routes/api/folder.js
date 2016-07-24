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
 * @description folder metadata
 * @http HEAD /api/v1.0/folder/:id
 */
router.head('/:id', login, function * () {

	const {id} = this.params;

	setHeaders(this);

	this.status = 200;
});

/**
 * @description folder content and metadata
 * @http GET /api/v1.0/folder/:id
 */
router.get('/:id', login, function * () {

	const {id} = this.params;

	setHeaders(this);

	this.body = 'placeholder';
});

/**
 * @description
 * @http POST /api/v1.0/folder
 */
router.post('/', login, body, function * () {

	const {path, recursive} = this.request.body;
	const {user} = this;

	try {
		const {id} = yield actions.folder.create({path, recursive, user});
		this.set('Location', `https://server/api/v1.0/folder/${id}`);
		this.status = 201;
		this.body = {id};
	} catch (error) {
		this.body = 'error';
		console.error(error);
	}
});

/**
 * @description deletes a folder
 * @http DELETE /api/v1.0/folder/:id
 */
router.delete('/:id', login, body, function * () {

	const {id} = this.params;
	const {recursive} = this.request.body;
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
