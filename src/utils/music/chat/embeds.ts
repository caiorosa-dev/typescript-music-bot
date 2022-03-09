/* eslint-disable max-len */
import { MessageEmbed } from 'discord.js';
import { videoInfo } from 'ytdl-core';

import config from '@config';

function addedToQueueEmbed(pos: number, url: string, info: videoInfo): MessageEmbed {
	return new MessageEmbed()
		.setAuthor('Adicionado vídeo a fila')
		.setTitle(info.videoDetails.title)
		.setTimestamp(new Date())
		.setColor(config.embedColor)
		.setURL(url)
		.addField('Canal', info.videoDetails.author, true)
		.addField('Duração', info.timestamp, true)
		.addField('Posição', pos, true);
}

function addedPlaylistToQueueEmbed(amount: number, queue: number, url: string, title: string): MessageEmbed {
	return new MessageEmbed()
		.setAuthor('Adicionada playlist a fila')
		.setTitle(title)
		.setURL(url)
		.setTimestamp(new Date())
		.setColor(config.embedColor)
		.addField('Adicionados', amount, true)
		.addField('Tamanho Fila', queue, true);
}

export { addedToQueueEmbed, addedPlaylistToQueueEmbed };
