import { Client, Message } from 'discord.js';

import ICommand from '@interface/Command';
import queue from '@util/music/queue';

module.exports = {
	config: {
		name: 'Play',
		category: 'Music',
		description: '',
		admin: false,
		aliases: ['leave', 'sair', 'disconnect', 'd']
	},
	execute: async (client: Client, message: Message, _args: string[]): Promise<boolean> => {
		const guildId = message.guild.id;
		const existConnection = queue.get(guildId) !== undefined
			? queue.get(guildId).server.connection !== null
			: false;

		if (!existConnection) {
			message.reply('Não to conectado não menor');
			return false;
		}

		const guildQueue = queue.get(guildId);
		if (guildQueue !== undefined && guildQueue.server.connection !== null) {
			message.reply('To saindo... To saindo...');
			guildQueue.server.connection.disconnect();
			guildQueue.server.connection = null;
			guildQueue.server.dispatcher = null;
		}

		return false;
	}
} as ICommand;
