/* eslint-disable eqeqeq */
import { MessageEmbed, PresenceData, TextChannel } from 'discord.js';

import config from '@config';
import client from '@util/client';

module.exports = (): void => {
	console.log(`Successfully connected to Discord API (With login: ${client.user.tag}).`);

	client.user.setPresence(config.activityPreference as PresenceData);

	const endDate = new Date('11-25-2022');

	const now = new Date();

	const oneDay = 1000 * 60 * 60 * 24;

	const daysToEnd = Math.round(endDate.getTime() - now.getTime()) / oneDay;

	const fixedDaysToEnd = Math.round(daysToEnd);

	const months = Math.floor(fixedDaysToEnd / 30);
	const days = Math.round(daysToEnd - (months * 30)).toFixed(0);

	const embed = new MessageEmbed()
		.setTitle('Fim das aulas :partying_face:')
		.setDescription(`Faltam, aproximadamente, **${months}** meses e **${days}** dias para acabar as aulas.`)
		.setColor(config.embedColor);

	const channel = (<TextChannel>client.channels.cache
		.find((obj) => obj.id == config.channelToSendMessage));

	channel.send(embed);
};
