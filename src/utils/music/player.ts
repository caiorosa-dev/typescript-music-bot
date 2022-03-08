import IQueue from '@interface/music/Queue';

import { getVideoInfo, getVideoStream } from './youtube';

async function play(link: string, queue: IQueue): Promise<void> {
	const { connection } = queue.server;

	const videoInfo = await getVideoInfo(link);
	console.log(videoInfo);

	// eslint-disable-next-line no-param-reassign
	queue.server.dispatcher = connection.play(getVideoStream(link));

	queue.server.dispatcher.on('finish', (test) => {
		console.log(test);
	});
}

export { play };
