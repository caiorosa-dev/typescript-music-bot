/* eslint-disable max-len */
import { Client, Message } from 'discord.js';

import ICommand from '@interface/Command';
import queue from '@util/music/queue';

module.exports = {
	config: {
		name: 'Loop',
		category: 'Music',
		description: 'Ativa o loop por faixa na fila',
		admin: false,
		aliases: ['loop', 'l']
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
			guildQueue.loop = !guildQueue.loop;
			const label = guildQueue.loop ? 'ativado' : 'desativado';

			message.channel.send(`:repeat: **O loop da musica foi** \`${label}\``);
			return false;
		}

		return false;
	}
} as ICommand;
