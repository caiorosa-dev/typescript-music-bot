/* eslint-disable max-len */
import { Client, Message } from 'discord.js';
import { validateURL } from 'ytdl-core';

import ICommand from '@interface/Command';
import { playSong, startPlaying } from '@util/music/player';
import queue, { initQueueWithMessage } from '@util/music/queue';
import { connect } from '@util/music/voice';
import { getVideoInfo, isPlaylistURL, searchVideo } from '@util/music/youtube/youtube';

module.exports = {
	config: {
		name: 'Play',
		category: 'Music',
		description: '',
		admin: false,
		aliases: ['play', 'tocar', 'p']
	},
	execute: async (client: Client, message: Message, _args: string[]): Promise<boolean> => {
		const guildId = message.guild.id;
		const { channel } = message.member.voice;
		const existConnection = queue.get(guildId) !== undefined ? queue.get(guildId).server.connection !== null : false;

		if (!existConnection && channel === null) {
			message.channel.send(':microphone2: **Você precisa estar em um canal de voz**');
			return false;
		}

		const guildQueue = queue.get(guildId) !== undefined ? queue.get(guildId) : initQueueWithMessage(guildId, message);
		if (await connect(guildQueue, channel)) {
			message.channel.send(`:loud_sound: **Conectado ao canal de voz:** \`${channel.name}\``);
		}

		if (guildQueue.songs.length > 0) {
			playSong(guildQueue.songs[0].link, guildQueue);

			message.channel.send(':cd: **Retomando a fila**.');
			return false;
		}

		const joinedArgs = _args.join(' ');

		if (joinedArgs.length <= 3) {
			message.channel.send(':x: **Por favor informe uma palavra maior para pesquisa**');
			return false;
		}

		const tempMessage = await message.channel.send(':mag: **Realizando pesquisa...**');

		const isValidLink = validateURL(joinedArgs) || isPlaylistURL(joinedArgs);
		let url = isValidLink ? joinedArgs : '';

		if (!isValidLink) {
			const search = await searchVideo(joinedArgs);
			if (search.length === 0) {
				await tempMessage.delete();

				message.channel.send(':construction: **Não foi possível encontrar nenhum resultado**');
				return false;
			}

			url = search[0].url;
		}

		if (guildQueue.songs.length === 0) {
			startPlaying(url, guildQueue);
			await tempMessage.delete();

			return false;
		}

		guildQueue.songs.push({ link: url });

		const videoInfo = await getVideoInfo(url);
		const videoTitle = videoInfo.videoDetails.title;

		await tempMessage.delete();
		message.channel.send(`**Adicionado na fila (${guildQueue.songs.length}):** ${videoTitle}`);
		return false;
	}
} as ICommand;