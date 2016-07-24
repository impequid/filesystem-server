export function * login (next) {
	this.user = {
		id: 'us3r1d'
	};
	yield next;
}
