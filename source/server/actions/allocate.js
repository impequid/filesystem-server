// import external

import fs from 'fs';
import mkdirp from 'mkdirp';
import async from 'async';
import path from 'path';

// import internal

import {isolate, rootify} from '../utilities/path';

// functions

/**
 * @description Sets up the storage folder for a new user.
 */
export default function allocate ({user}) {
	return new Promise ((resolve, reject) => {
		const root = rootify(user);
		mkdirp(root, (error, data) => {
			if (error) return reject(error);
			const folders = ['Apps', 'Code', 'Documents', 'Music', 'Pictures', 'Videos'];
			async.map(folders.map(folder => {
				return path.join(root, folder);
			}), mkdirp, (error, result) => {
				console.log(error, result);
			});
		});
	});
}
