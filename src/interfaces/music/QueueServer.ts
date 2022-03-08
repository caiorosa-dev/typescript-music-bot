import { StreamDispatcher, VoiceConnection } from 'discord.js';

interface IQueueServer {
	connection: VoiceConnection;
	dispatcher: StreamDispatcher;
}

export default IQueueServer;
