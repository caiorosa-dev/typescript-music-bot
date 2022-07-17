/* eslint-disable max-len */
import YoutubeAPI from 'simple-youtube-api';
import { Readable } from 'stream';
import ytScrapper from 'yt-search';
import ytdl, { downloadOptions, videoInfo } from 'ytdl-core';

import config from '@config';
import IPlaylistVideo from '@interface/music/PlaylistVideo';
import ISearchResult from '@interface/music/SearchResult';

const youtubeClient = new YoutubeAPI(config.youtubeApiKey);

const YTDL_OPTIONS: downloadOptions = {
	filter: 'audioonly',
	quality: 'highestaudio'
};

function getVideoStream(url: string): Readable {
	return ytdl(url, YTDL_OPTIONS);
}

function validateURL(url: string): boolean {
	return ytdl.validateURL(url);
}

function isPlaylistURL(url: string): boolean {
	return url.includes('list=');
}

async function getVideoInfo(url: string): Promise<videoInfo> {
	return await ytdl.getBasicInfo(url);
}

async function searchVideo(query: string): Promise<ISearchResult[]> {
	return (await ytScrapper(query)).videos;
}

async function getPlaylistVideos(url: string): Promise<IPlaylistVideo[]> {
	const playlist = await youtubeClient.getPlaylist(url);

	const videos = await playlist.getVideos();

	return videos;
}

type PlaylistInfo = {
	title: string;
	firstUrl: string;
}

async function getPlaylistInfo(url: string): Promise<PlaylistInfo> {
	const playlist = await youtubeClient.getPlaylist(url);

	const firstUrl = playlist.thumbnails.maxres ? playlist.thumbnails.maxres.url : playlist.thumbnails.default.url;

	return {
		title: playlist.title,
		firstUrl
	};
}

export { getVideoStream, validateURL, getPlaylistVideos, isPlaylistURL, searchVideo, getVideoInfo, getPlaylistInfo };
