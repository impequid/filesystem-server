// import external

import fs from 'fs';
import mkdirp from 'mkdirp';
import {isolate} from '../utilities/path';

// functions

export function create ({recursive, user, parent}) {
	return new Promise ((resolve, reject) => {
		const isoPath = isolate({user, path});
		const id = 'r4nd0m1d';
		if (recursive) {
			mkdirp(isoPath, (error, data) => {
				if (!error) {
					resolve({id});
				} else reject(error);
			});
		} else {
			fs.mkdir(isoPath, (error, data) => {
				if (!error) {
					resolve({id});
				} else reject(error);
			});
		}
	});
}

export function get ({user, id}) {
	return new Promise ((resolve, reject) => {
		const isoPath = isolate({user, id});
	});
}

// export

export default {
	create
};
