import { Message } from 'discord.js';

function isUserAdmin(message: Message): boolean {
	return message.member.permissionsIn(message.channel).has('ADMINISTRATOR');
}

export { isUserAdmin };
