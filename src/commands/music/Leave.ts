/* eslint-disable max-len */
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
		if (guildQueue !== undefined && guildQueue.server.connection !== null) {
			message.channel.send(`:sound: **Desconectando do canal de voz:** ${guildQueue.server.connection.channel.name}`);

			guildQueue.server.connection.disconnect();
			guildQueue.server.connection = null;
			guildQueue.server.dispatcher = null;
		}

		return false;
	}
} as ICommand;
