import config from '@config';
import client from '@util/client';
import runLoader from '@util/loader';

runLoader();

client.login(config.token);
