import { DMChannel, Guild, GuildMember, NewsChannel, TextChannel } from 'discord.js';

import IQueueMusic from './QueueMusic';
import IQueueServer from './QueueServer';

interface IQueue {
	server: IQueueServer;
	songs: IQueueMusic[];
	guild: Guild;
	loop: boolean;
	queueLoop: boolean;
	currentSong?: number;
	messageChannel: TextChannel | DMChannel | NewsChannel;
	requestedBy?: GuildMember;
}

export default IQueue;
