import { Client, Message } from 'discord.js';

import ICommandConfig from './CommandConfig';

interface ICommand {
	config: ICommandConfig;
	execute(client: Client, message: Message, args: string[]): Promise<boolean>;
}

export default ICommand;
