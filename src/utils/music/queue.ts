import { Guild } from 'discord.js';

import IQueue from '@interface/music/Queue';

const queue: Map<string, IQueue> = new Map();

function initQueue(guildId: string, guild: Guild): IQueue {
	const currentQueue: IQueue = {
		server: {
			connection: null,
			dispatcher: null
		},
		songs: [],
		guild,
		loop: false
	};

	queue.set(guildId, currentQueue);

	return currentQueue;
}

export default queue;
export { initQueue };
