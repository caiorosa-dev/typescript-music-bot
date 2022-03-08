import { Message } from 'discord.js';

import config from '@config';
import { executeCommand } from '@util/executor/commandExecutor';

module.exports = async (message: Message): Promise<void> => {
	const { content } = message;
	const contentSplit = content.startsWith(config.prefix) ? content.split('!')[1] : '';
	const command = contentSplit.split(' ')[0];

	if (content.startsWith(config.prefix)) {
		const args = contentSplit.split(' ').length > 1 ? contentSplit.split(' ', 2)[1].split('||') : [];

		const deleteMessage = await executeCommand(command, message, args);
		if (deleteMessage) {
			await message.delete();
		}
	}
};
