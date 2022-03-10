/* eslint-disable max-len */
import { Client, Message } from 'discord.js';

import ICommand from '@interface/Command';
import queue from '@util/music/queue';

module.exports = {
	config: {
		name: 'NowPlaying',
		category: 'Music',
		description: 'Mostra a faixa que está tocando no momento',
		admin: false,
		aliases: ['nowplaying', 'np']
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
		if (guildQueue !== undefined && guildQueue.server.dispatcher !== null && guildQueue.songs.length > 0) {
			const currentSong = guildQueue.songs[0];

			message.channel.send(`:musical_note: **Tocando no momento:** \`${currentSong.title}\``);
			return false;
		}

		message.channel.send(':x: **Não estou reproduzindo nenhuma faixa no momento** ');
		return false;
	}
} as ICommand;
