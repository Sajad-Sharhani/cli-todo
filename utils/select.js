import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { MultiSelect } = require('enquirer');
const to = require('await-to-js').default;
import shouldCancel from './cli-should-cancel.js';
const handleError = require('cli-handle-error');

export default async ({ message, choices }) => {
	const [err, response] = await to(
		new MultiSelect({
			message,
			choices,
			hint: `\nuse [space] to select multiple options and [enter] to confirm`,
			validate(value) {
				return value.length === 0
					? 'Please select at least one todo.'
					: true;
			}
		})
			.on(`cancel`, () => shouldCancel())
			.run()
	);
	handleError(`INPUT`, err);
	return response;
};
