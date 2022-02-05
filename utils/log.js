import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const alert = require('cli-alerts');

export default info => {
	alert({
		type: `warning`,
		name: `DEBUG LOG`,
		msg: ``
	});

	console.log(info);
	console.log();
};
