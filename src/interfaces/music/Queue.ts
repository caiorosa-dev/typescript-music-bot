import { Guild } from 'discord.js';

import IQueueMusic from './QueueMusic';
import IQueueServer from './QueueServer';

interface IQueue {
	server: IQueueServer;
	songs: IQueueMusic[];
	guild: Guild;
	loop: boolean;
}

export default IQueue;
