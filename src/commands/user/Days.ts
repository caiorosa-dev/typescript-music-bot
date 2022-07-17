import { Client, Message, MessageEmbed } from 'discord.js';

import config from '@config';
import ICommand from '@interface/Command';

module.exports = {
	config: {
		name: 'Days',
		category: 'User',
		description: 'Envia a quantidade de dias para as ferias',
		admin: true,
		aliases: ['days', 'dias', 'ferias', 'vacation']
	},
	execute: async (client: Client, message: Message, _args: string[]): Promise<boolean> => {
		const vacationDate = new Date('25/11/2022');
		const now = new Date();

		const oneDay = 1000 * 60 * 60 * 24;

		const differenceInDays = Math.round(now.getTime() - vacationDate.getTime()) / (oneDay);
		const fixedDifference = differenceInDays.toFixed(0);

		const embed = new MessageEmbed()
			.setAuthor('Fim das aulas :partying_face:', message.member.user.avatarURL())
			.setDescription(`Faltam, aproximadamente, ${fixedDifference} dias para acabar as aulas`)
			.setColor(config.embedColor);

		message.channel.send(embed);

		return true;
	}
} as ICommand;
