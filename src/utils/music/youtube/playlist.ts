import IQueue from '@interface/music/Queue';

import { getPlaylistVideos, isPlaylistURL } from './youtube';

async function addVideosIfPlaylist(url: string, queue: IQueue): Promise<number> {
	if (isPlaylistURL(url)) {
		console.log('DEU PAU');
		const videos = await getPlaylistVideos(url);

		let i = 0;

		videos.forEach((video) => {
			i += 1;
			queue.songs.push({
				link: video.url
			});
		});

		return i;
	}

	return 0;
}

export { addVideosIfPlaylist };
