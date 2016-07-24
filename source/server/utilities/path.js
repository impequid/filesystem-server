// import external

import nodePath from 'path';

// import internal

import config from '../config';

// functions

export function isolate ({user, path}) {
	return nodePath.join(rootify(user), nodePath.resolve('/', path));
}

export function rootify (user) {
	return nodePath.join(config.storage.path, user.id);
}
