import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const welcome = require('cli-welcome');
const pkg = require('./../package.json');
const unhandled = require('cli-handle-unhandled');

export default ({ clear = true }) => {
	unhandled();
	welcome({
		title: `cli-todo`,
		tagLine: `by Sajad Sharhani`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#36BB09',
		color: '#000000',
		bold: true,
		clear
	});
};
