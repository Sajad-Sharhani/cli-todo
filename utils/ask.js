import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Input } = require('enquirer');
const to = require('await-to-js').default;
import shouldCancel from './cli-should-cancel.js';
const handleError = require('cli-handle-error');

export default async ({ message }) => {
	const [err, response] = await to(
		new Input({
			message,
			validate(value) {
				return !value ? 'Please enter a value' : true;
			}
		})
			.on(`cancel`, () => shouldCancel())
			.run()
	);
	handleError(`INPUT`, err);
	return response;
};
