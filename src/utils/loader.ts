/* eslint-disable eqeqeq */
import path from 'path';

import { commandsMap } from './executor/commandExecutor';
import loadCommands from './loader/commandLoader';
import loadEvents from './loader/eventLoader';

export default function runLoading(): void {
	const srcDir = path.resolve(__dirname, '..');
	const commandsDir = path.resolve(srcDir, 'commands');
	const eventsDir = path.resolve(srcDir, 'events');

	loadCommands(commandsMap, commandsDir);
	console.log('------------------------------');
	console.log(`Loaded ${commandsMap.size} command aliases.`);
	console.log('------------------------------');

	loadEvents(eventsDir);
}
