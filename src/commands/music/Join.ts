import { Client, Message } from 'discord.js';

import ICommand from '@interface/Command';
import queue, { initQueueWithMessage } from '@util/music/queue';

module.exports = {
	config: {
		name: 'Play',
		category: 'Music',
		description: '',
		admin: false,
		aliases: ['join', 'entrar', 'connect', 'c']
	},
	execute: async (client: Client, message: Message, _args: string[]): Promise<boolean> => {
		const guildId = message.guild.id;
		const { channel } = message.member.voice;
		const existConnection = queue.get(guildId) !== undefined
			? queue.get(guildId).server.connection !== null
			: false;

		if (!existConnection && message.member.voice.channel === null) {
			message.reply('Entra em um canal ai, por favor :(');
			return false;
		}

		// eslint-disable-next-line max-len
		const guildQueue = queue.get(guildId) !== undefined ? queue.get(guildId) : initQueueWithMessage(guildId, message);
		if (guildQueue.server.connection === null) {
			guildQueue.server.connection = await channel.join();
			message.reply('Pronto porra, entrei nesse caralho');
		}

		return false;
	}
} as ICommand;
