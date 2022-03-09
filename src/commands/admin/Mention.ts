import { Client, Message } from 'discord.js';

import ICommand from '@interface/Command';

module.exports = {
	config: {
		name: 'Mention',
		category: 'Administration',
		description: 'Menciona todos os usuários (Cuidado)',
		admin: true,
		aliases: ['mention', 'everyone', 'todos']
	},
	execute: async (client: Client, message: Message, _args: string[]): Promise<boolean> => {
		const mentionMessage = await message.channel.send('@everyone');

		await mentionMessage.delete();

		return true;
	}
} as ICommand;
