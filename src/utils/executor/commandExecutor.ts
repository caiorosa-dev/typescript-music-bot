import { Message } from 'discord.js';

import ICommand from '@interface/Command';
import client from '@util/client';
import { isUserAdmin } from '@util/discord';

const commandsMap: Map<string, ICommand> = new Map();

function getCommand(commandString: string) {
	return commandsMap.get(commandString);
}

// eslint-disable-next-line max-len
async function executeCommand(commandStr: string, message: Message, args: string[]): Promise<boolean> {
	const command = getCommand(commandStr);
	if (command === undefined) return false;

	const isAdmin = command.config.admin;
	if (isAdmin && !isUserAdmin(message)) {
		return true;
	}

	return await command.execute(client, message, args);
}

export { commandsMap, executeCommand };
