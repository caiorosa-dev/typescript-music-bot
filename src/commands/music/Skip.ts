/* eslint-disable max-len */
import { Client, Message } from 'discord.js';

import ICommand from '@interface/Command';
import { playSong } from '@util/music/player';
import queue from '@util/music/queue';

module.exports = {
	config: {
		name: 'Skip',
		category: 'Music',
		description: 'Pula uma faixa',
		admin: false,
		aliases: ['skip', 'pular', 's']
	},
	execute: async (client: Client, message: Message, _args: string[]): Promise<boolean> => {
		const guildId = message.guild.id;
		const existDispatcher = queue.get(guildId) !== undefined ? queue.get(guildId).server.dispatcher !== null : false;

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
		guildQueue.songs.shift();

		if (guildQueue.songs.length > 0) {
			playSong(guildQueue.songs[0].link, guildQueue);
		} else {
			message.channel.send(':white_check_mark: **Fila finalizada**');
		}

		return false;
	}
} as ICommand;
