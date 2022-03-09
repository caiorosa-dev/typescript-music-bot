import { Client, Message, MessageEmbed } from 'discord.js';

import config from '@config';
import ICommand from '@interface/Command';
import { commandsMap } from '@util/executor/commandExecutor';

module.exports = {
	config: {
		name: 'Help',
		category: 'User',
		description: 'Envia a lista de comandos',
		admin: true,
		aliases: ['help', 'ajuda', 'comandos']
	},
	execute: async (client: Client, message: Message, _args: string[]): Promise<boolean> => {
		const commands = [] as ICommand[];

		commandsMap.forEach((value) => {
			const existCommand = commands.find((cmd) => cmd.config.name === value.config.name);

			if (!existCommand) {
				commands.push(value);
			}
		});

		const embed = new MessageEmbed()
			.setAuthor('Lista de comandos', message.member.user.avatarURL())
			.setColor(config.embedColor)
			.setTimestamp(new Date());

		let description = '';

		commands.forEach((command) => {
			const cmdConfig = command.config;
			const aliases = cmdConfig.aliases.join(', ');
			const aliasesLabel = cmdConfig.aliases.length > 1 ? `${config.prefix}[${aliases}]` : `${config.prefix}${aliases}`;

			description += `[${cmdConfig.category}] **${cmdConfig.name}** *${aliasesLabel}* - \`${cmdConfig.description}\` \n\n`;
		});

		embed.setDescription(description);
		message.channel.send(embed);

		return true;
	}
} as ICommand;
