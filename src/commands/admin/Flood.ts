/* eslint-disable no-plusplus */
import { Client, Message } from 'discord.js';

import ICommand from '@interface/Command';

module.exports = {
	config: {
		name: 'Flood',
		category: 'Administration',
		description: 'Menciona um usuário 20 vezes',
		admin: true,
		aliases: ['mention', 'everyone', 'todos']
	},
	execute: async (client: Client, message: Message, _args: string[]): Promise<boolean> => {
		if (message.mentions.users.size === 0) {
			const tempMsg = await message.channel.send(':x: **Por favor mencione algum filho da puta**');

			setTimeout(() => {
				tempMsg.delete();
			}, 2500);
			return true;
		}

		const user = message.mentions.users.first();

		for (let i = 0; i < 10; i++) {
			message.channel.send(`<@${user.id}>`).then((msg) => {
				msg.delete();
			});
		}

		return false;
	}
} as ICommand;
