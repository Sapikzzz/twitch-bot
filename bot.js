require('dotenv').config()

TOKEN = process.env.TOKEN

const tmi = require('tmi.js');
const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: 'bot_name',
		password: `oauth:${TOKEN}`
	},
	channels: [ 'my_channel' ]
});
client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${tags.username}, heya!`);
	}
});