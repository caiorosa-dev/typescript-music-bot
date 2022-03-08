import { PresenceData } from 'discord.js';

import config from '@config';
import client from '@util/client';

module.exports = (): void => {
	console.log(`Successfully connected to Discord API (With login: ${client.user.tag}).`);

	client.user.setPresence(config.activityPreference as PresenceData);
};
