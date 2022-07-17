import { Guild, Message } from 'discord.js';

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
		loop: false,
		queueLoop: false,
		messageChannel: null
	};

	queue.set(guildId, currentQueue);

	return currentQueue;
}

function initQueueWithMessage(guildId: string, message: Message): IQueue {
	const guildQueue = initQueue(guildId, message.guild);

	guildQueue.messageChannel = message.channel;

	const channelName = message.guild.channels.cache.get(message.channel.id).name;
	guildQueue.messageChannel.send(`:keyboard: **Vinculado ao canal de texto:** \`${channelName}\``);

	return guildQueue;
}

function deleteQueue(guildId: string): void {
	queue.delete(guildId);
}

function shuffleQueue(currentQueue: IQueue): void {
	const array = currentQueue.songs;

	for (let i = array.length - 1; i > 0; i -= 1) {
		const newIndex = Math.floor(Math.random() * (i + 1));
		[array[i], array[newIndex]] = [array[newIndex], array[i]];
	}
}

export default queue;
export { initQueue, initQueueWithMessage, deleteQueue, shuffleQueue };
