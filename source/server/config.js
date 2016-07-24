let customConfig;

try {
	customConfig = require('../../config.json');
} catch (error) {
	console.error('could not load config.json');
	customConfig = {};
}

const config = Object.assign({
	listen: {
		port: 50002,
		address: '127.0.0.1'
	},
	storage: {
		path: '/home/dodekeract/code/impequid/filesystem-server/storage'
	},
	server: {
		name: 'Impequid Filesystem Server',
		domain: 'example.impequid-filesystem.server'
	}
}, customConfig);

export default config;
