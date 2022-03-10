/* eslint-disable max-len */
import { Client, Message } from 'discord.js';

import ICommand from '@interface/Command';
import queue, { initQueueWithMessage } from '@util/music/queue';

module.exports = {
	config: {
		name: 'Join',
		category: 'Music',
		description: 'Entra no canal de voz do usuário',
		admin: false,
		aliases: ['join', 'entrar', 'connect', 'c', 'j']
	},
	execute: async (client: Client, message: Message, _args: string[]): Promise<boolean> => {
		const guildId = message.guild.id;
		const { channel } = message.member.voice;
		const existConnection = queue.get(guildId) !== undefined ? queue.get(guildId).server.connection !== null : false;

		if (queue.get(guildId) !== undefined && queue.get(guildId).messageChannel.id !== message.channel.id) {
			const tempMsg = await message.channel.send(':x: **Estou vinculado a outro canal de texto!**');
			setTimeout(async () => {
				await tempMsg.delete();
			}, 2500);

			return true;
		}

		if (!existConnection && message.member.voice.channel === null) {
			message.channel.send(':microphone2: **Você precisa estar em um canal de voz**');
			return false;
		}

		// eslint-disable-next-line max-len
		const guildQueue = queue.get(guildId) !== undefined ? queue.get(guildId) : initQueueWithMessage(guildId, message);
		if (guildQueue.server.connection === null) {
			guildQueue.server.connection = await channel.join();
			message.channel.send(`:loud_sound: **Conectado ao canal de voz:** \`${channel.name}\``);
		}

		return false;
	}
} as ICommand;
