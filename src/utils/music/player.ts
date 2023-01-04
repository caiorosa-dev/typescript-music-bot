/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { validateURL } from 'ytdl-core';

import IQueue from '@interface/music/Queue';

import { addedPlaylistToQueueEmbed } from './chat/embeds';
import { addVideosIfPlaylist } from './youtube/playlist';
import { getPlaylistInfo, getVideoInfo, getVideoStream } from './youtube/youtube';

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

	queue.server.dispatcher = connection.play(getVideoStream(link));

	queue.server.dispatcher.on('finish', () => {
		if (queue.loop) {
			playSong(link, queue);
			return;
		}

		if (queue.queueLoop) {
			if (queue.currentSong === undefined) queue.currentSong = 0;
			else queue.currentSong += 1;

			if (queue.currentSong >= queue.songs.length) queue.currentSong = 0;

			playSong(queue.songs[queue.currentSong].link, queue);
			return;
		}

		queue.currentSong = 0;

		queue.songs.shift();
		if (queue.songs.length > 0) {
			playSong(queue.songs[0].link, queue);
		} else {
			queue.messageChannel.send(':white_check_mark: **Fila finalizada**');
		}
	});
}

async function startPlaying(url: string, queue: IQueue, playlist = true): Promise<void> {
	const playlistAmount = playlist ? await addVideosIfPlaylist(url, queue) : 0;

	const videoInfo = await getVideoInfo(url);

	if (!playlistAmount || !playlist) {
		queue.songs.push({ link: url, title: videoInfo.videoDetails.title });
	} else {
		const playlistInfo = await getPlaylistInfo(url);
		const avatar = queue.requestedBy.user.avatarURL();

		const embed = addedPlaylistToQueueEmbed(playlistAmount, queue.songs.length, url, playlistInfo.title, playlistInfo.firstUrl, avatar);

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
