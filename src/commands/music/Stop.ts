/* eslint-disable max-len */
import { Client, Message } from 'discord.js';

import ICommand from '@interface/Command';
import queue from '@util/music/queue';

module.exports = {
	config: {
		name: 'Stop',
		category: 'Music',
		description: 'Para a música atual (Não limpa a fila)',
		admin: false,
		aliases: ['stop']
	},
	execute: async (client: Client, message: Message, _args: string[]): Promise<boolean> => {
		const guildId = message.guild.id;
		const existDispatcher = queue.get(guildId) !== undefined ? queue.get(guildId).server.dispatcher !== null &&
		queue.get(guildId).server.connection !== null : false;

		if (queue.get(guildId) !== undefined && queue.get(guildId).messageChannel.id !== message.channel.id) {
			const tempMsg = await message.channel.send(':x: **Estou vinculado a outro canal de texto!**');
			setTimeout(async () => {
				await tempMsg.delete();
			}, 2500);

			return true;
		}

		if (!existDispatcher) {
			message.channel.send(':x: **Não está tocando nada no momento**');
			return false;
		}

		const guildQueue = queue.get(guildId);
		guildQueue.server.dispatcher.end();

		message.channel.send(':no_entry: **Música parada**');
		return false;
	}
} as ICommand;
