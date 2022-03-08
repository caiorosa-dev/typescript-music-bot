/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import ICommand from '@interface/Command';
import {
	getFilePath, isJSFile, readDirectory, readFile
} from '@util/files';

export default function loadCommands(map: Map<string, ICommand>, dir: string): void {
	console.log(`Loading commands from directory '${dir}'`);

	readDirectory(dir, (filename) => {
		const file = getFilePath(dir, filename);

		if (readFile(file).isDirectory()) {
			loadCommands(map, file);
			return;
		}

		if (!isJSFile(file)) return;

		try {
			const cmd: ICommand = require(file);

			cmd.config.aliases.forEach((alias) => {
				map.set(alias, cmd);
			});
		} catch (error) {
			console.error(`An error occurred when trying to load command '${filename}'`);
		}
	});
}
