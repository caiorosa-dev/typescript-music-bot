import { Readable } from 'stream';
import ytplaylist from 'youtube-playlist';
import ytScrapper from 'yt-search';
import ytdl, { downloadOptions, videoInfo } from 'ytdl-core';

import IPlaylistVideo from '@interface/music/PlaylistVideo';

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
	return url.includes('?list=');
}

async function getVideoInfo(url: string): Promise<videoInfo> {
	return await ytdl.getBasicInfo(url);
}

async function searchVideo(query: string): Promise<unknown> {
	return await ytScrapper(query);
}

async function getPlaylistVideos(url: string): Promise<IPlaylistVideo[]> {
	const { data } = await ytplaylist(url, ['url', 'name']);

	return data;
}

export {
	getVideoStream, validateURL, getPlaylistVideos, isPlaylistURL, searchVideo, getVideoInfo
};
