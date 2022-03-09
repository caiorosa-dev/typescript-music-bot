/* eslint-disable max-len */
import { MessageEmbed } from 'discord.js';
import { videoInfo } from 'ytdl-core';

import config from '@config';

function addedToQueueEmbed(pos: number, url: string, info: videoInfo, avatar: string): MessageEmbed {
	return new MessageEmbed()
		.setAuthor('Adicionado vídeo a fila', avatar)
		.setTitle(info.videoDetails.title)
		.setTimestamp(new Date())
		.setColor(config.embedColor)
		.setThumbnail(info.videoDetails.thumbnails[0].url)
		.setURL(url)
		.addField('Canal', `\`${info.videoDetails.author.name}\``, true)
		.addField('Duração', `\`${info.videoDetails.lengthSeconds} segundos\``, true)
		.addField('Posição', `\`${pos}\``, true);
}

function addedPlaylistToQueueEmbed(amount: number, queue: number, url: string, title: string, thumb: string, avatar: string): MessageEmbed {
	return new MessageEmbed()
		.setAuthor('Adicionada playlist a fila', avatar)
		.setTitle(title)
		.setURL(url)
		.setThumbnail(thumb)
		.setTimestamp(new Date())
		.setColor(config.embedColor)
		.addField('Adicionados', amount, true)
		.addField('Tamanho da Fila', queue, true);
}

export { addedToQueueEmbed, addedPlaylistToQueueEmbed };
