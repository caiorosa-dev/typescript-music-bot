/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { validateURL } from 'ytdl-core';

import IQueue from '@interface/music/Queue';

import { addedPlaylistToQueueEmbed } from './chat/embeds';
import { addVideosIfPlaylist } from './youtube/playlist';
import { getPlaylistTitle, getVideoInfo, getVideoStream } from './youtube/youtube';

/**
 * Function to play a specific song by url
 * @param link Url to play
 * @param queue Queue object of guild
 * @returns Nothing
 */
async function playSong(link: string, queue: IQueue): Promise<void> {
	const { connection } = queue.server;

	if (connection === null) return;

	const videoInfo = await getVideoInfo(link);
	const videoTitle = videoInfo.videoDetails.title;

	queue.messageChannel.send(`:notes: **Tocando agora:** \`${videoTitle}\``);

	// eslint-disable-next-line no-param-reassign
	queue.server.dispatcher = connection.play(getVideoStream(link));

	queue.server.dispatcher.on('finish', () => {
		if (queue.loop) {
			playSong(link, queue);
			return;
		}

		queue.songs.shift();
		if (queue.songs.length > 0) {
			playSong(queue.songs[0].link, queue);
		}
	});
}

async function startPlaying(url: string, queue: IQueue): Promise<void> {
	const playlistAmount = await addVideosIfPlaylist(url, queue);

	if (!playlistAmount) {
		queue.songs.push({ link: url });
	} else {
		const playlistTitle = await getPlaylistTitle(url);

		const embed = addedPlaylistToQueueEmbed(playlistAmount, queue.songs.length, url, playlistTitle);

		queue.messageChannel.send(embed);
	}

	if (queue.songs.length > 0) {
		const songLink = validateURL(url) ? url : queue.songs[0].link;

		playSong(songLink, queue);
		return;
	}

	queue.messageChannel.send(':construction: **Não foi possível validar o link fornecido**');
}

export { playSong, startPlaying };
