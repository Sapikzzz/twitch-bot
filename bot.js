require('dotenv').config();
const sprintf = require('sprintf-js').sprintf;

function getTimeOfMessage(){
	const date = new Date();
	let day = (date.getDate() < 10 ? '0' : '') + date.getDate();
	let month = date.getMonth() + 1;
	month = (month < 10 ? '0' : '') + month;
	let year = date.getFullYear();
	let hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
	let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
	let seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
	
	return `${day}-${month}-${year} ${hour}:${minute}:${seconds}`
}

const tmi = require('tmi.js');
const client = new tmi.Client({
	
	identity: {
		username: 'uwuskochany',
		password: `oauth:${process.env.TOKEN}`
	},
	channels: [ 'h2p_gucio' ]
});

client.connect().catch(console.error);

client.on('message', (channel, userstate, message, self) => {
	if(self) return;
	let timeOfMessage = getTimeOfMessage();
	console.log(`[${timeOfMessage}] ${userstate['display-name']}: ${message}`)
});