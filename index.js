#!/usr/bin/env node

/**
 * cli-todo
 * CLI to mange todos anywhere
 *
 * @author Sajad Sharhani <https://twitter.com/SajadSharhani>
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import lodash from 'lodash';
// import {green as g, red as r, yellow as y} from 'chalk';
import alert from 'cli-alerts';
const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');

//Database

import { JSONFileSync, Low } from 'lowdb';
// const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');
const dbTodos = path.join(process.cwd(), '.todo/todos.json');

import init from './utils/init.js';
import cli from './utils/cli.js';
import log from './utils/log.js';
import ask from './utils/ask.js';
// const init = require('./utils/init');
// const cli = require('./utils/cli');
// const log = require('./utils/log');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	if (!fs.existsSync(dbTodos)) {
		await makeDir(`.todo`);
		process.chdir(`.todo`);
		fs.writeFileSync(`todos.json`, `{}`);
	}

	const adapter = new JSONFileSync(dbTodos);
	const db = new Low(adapter);
	await db.read();
	db.data ||= { todos: [] };
	await db.write();

	db.chain = lodash.chain(db.data);

	// COMMAND: todo view or todo ls
	if (input.includes(`view`) || input.includes(`ls`)) {
		const allTodos = db.chain.get('todos').value();
		allTodos.map((todo, i) => console.log(`${++i}. ${todo.title}`));
	}

	// COMMAND: todo add
	if (input.includes(`add`)) {
		const whatTodo = await ask({ message: 'add a todo' });
		db.data.todos.push({ title: whatTodo });
		db.write();
		alert({
			type: `success`,
			name: `ADDED`,
			msg: `successfully!`
		});
	}

	debug && log(flags);
})();
