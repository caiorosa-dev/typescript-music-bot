import { Channel, DMChannel, Guild, NewsChannel, TextChannel } from 'discord.js';

import IQueueMusic from './QueueMusic';
import IQueueServer from './QueueServer';

interface IQueue {
	server: IQueueServer;
	songs: IQueueMusic[];
	guild: Guild;
	loop: boolean;
	messageChannel: TextChannel | DMChannel | NewsChannel;
}

export default IQueue;
