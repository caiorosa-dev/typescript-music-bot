/* eslint-disable max-len */
import { Client, Message } from 'discord.js';

import ICommand from '@interface/Command';
import queue from '@util/music/queue';

module.exports = {
	config: {
		name: 'Pause',
		category: 'Music',
		description: 'Pausa a faixa atual',
		admin: false,
		aliases: ['pause', 'pausar', 'stop']
	},
	execute: async (client: Client, message: Message, _args: string[]): Promise<boolean> => {
		const guildId = message.guild.id;
		const existConnection = queue.get(guildId) !== undefined ? queue.get(guildId).server.connection !== null : false;

		if (queue.get(guildId) !== undefined && queue.get(guildId).messageChannel.id !== message.channel.id) {
			const tempMsg = await message.channel.send(':x: **Estou vinculado a outro canal de texto!**');
			setTimeout(async () => {
				await tempMsg.delete();
			}, 2500);

			return true;
		}

		if (!existConnection) {
			message.channel.send(':x: **Não estou conectado a nenhum canal de voz**');
			return false;
		}

		const guildQueue = queue.get(guildId);
		if (guildQueue !== undefined && guildQueue.server.dispatcher !== null && !guildQueue.server.dispatcher.paused) {
			guildQueue.server.dispatcher.pause();
			message.channel.send(':pause_button: **Faixa pausada com sucesso**');

			return false;
		}

		message.channel.send(':x: **A faixa já está pausada**');
		return false;
	}
} as ICommand;
