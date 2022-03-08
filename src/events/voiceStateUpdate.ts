import { VoiceState } from 'discord.js';

import client from '@util/client';
import queue from '@util/music/queue';

module.exports = (oldState: VoiceState, newState: VoiceState): void => {
	const leaving = newState.channel === null;
	const { channel } = oldState;

	if (leaving && oldState.member.id !== client.user.id) {
		let guildQueue = queue.get(channel.guild.id);
		const queueServer = guildQueue.server;

		if (guildQueue !== undefined && queueServer.connection !== null) {
			const connectionChannelId = queueServer.connection.channel.id;

			if (connectionChannelId === channel.id && channel.members.size === 1) {
				console.log('Saindo em 5 minutos');

				setTimeout(() => {
					guildQueue = queue.get(channel.guild.id);

					if (channel.members.size > 1) {
						return;
					}

					if (guildQueue !== undefined && queueServer.connection !== undefined) {
						queueServer.connection.disconnect();

						queueServer.connection = null;
						queueServer.dispatcher = null;
					}
				}, 300000);
			}
		}
	}
};
