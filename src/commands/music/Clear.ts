/* eslint-disable max-len */
import { Client, Message } from 'discord.js';

import ICommand from '@interface/Command';
import queue from '@util/music/queue';

module.exports = {
	config: {
		name: 'Clear',
		category: 'Music',
		description: 'Limpa a fila',
		admin: false,
		aliases: ['clear', 'c', 'limpar']
	},
	execute: async (client: Client, message: Message, _args: string[]): Promise<boolean> => {
		const guildId = message.guild.id;

		if (queue.get(guildId) !== undefined && queue.get(guildId).messageChannel.id !== message.channel.id) {
			const tempMsg = await message.channel.send(':x: **Estou vinculado a outro canal de texto!**');
			setTimeout(async () => {
				await tempMsg.delete();
			}, 2500);

			return true;
		}

		const guildQueue = queue.get(guildId);
		if (guildQueue !== undefined && guildQueue.songs.length > 0) {
			guildQueue.songs = [];

			message.channel.send(':page_facing_up: **Fila limpa com sucesso**');

			return false;
		}

		message.channel.send(':x: **A fila está vazia**');
		return false;
	}
} as ICommand;
