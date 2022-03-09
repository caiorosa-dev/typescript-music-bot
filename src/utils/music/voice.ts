/* eslint-disable no-param-reassign */
import { VoiceChannel } from 'discord.js';

import IQueue from '@interface/music/Queue';

async function connect(queue: IQueue, channel: VoiceChannel): Promise<boolean> {
	if (queue.server.connection === null) {
		queue.server.connection = await channel.join();
		return true;
	}

	return false;
}

async function disconnect(queue: IQueue): Promise<boolean> {
	if (queue.server.connection === null) {
		return false;
	}

	queue.server.connection.disconnect();

	queue.server.connection = null;
	queue.server.dispatcher = null;

	return true;
}

export { connect, disconnect };
