/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import client from '@util/client';
import {
	getFilePath, isJSFile, readDirectory, readFile
} from '@util/files';

export default function loadEvents(dir: string): void {
	console.log(`Loading events from directory '${dir}'`);

	readDirectory(dir, (filename) => {
		const file = getFilePath(dir, filename);

		if (readFile(file).isDirectory()) {
			loadEvents(file);
			return;
		}

		if (!isJSFile(file)) return;

		try {
			const eventFunction = require(file);

			const eventName = filename.split('.')[0];

			client.on(eventName, eventFunction);

			console.log(`Event '${eventName} has been loaded with success`);
		} catch (error) {
			console.error(error);

			console.error(`An error occurred when trying to load event '${filename}'`);
		}
	});
}
