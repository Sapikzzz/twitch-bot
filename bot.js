require("dotenv").config();
const sprintf = require("sprintf-js").sprintf;
const fs = require("node:fs");

const folderPath = process.env.FOLDERPATH;
const channels = process.env.CHANNELS.split(",");
console.log(channels);

function getTimeOfMessage() {
	const date = new Date();
	let day = (date.getDate() < 10 ? "0" : "") + date.getDate();
	let month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;
	let year = date.getFullYear();
	let hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
	let minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
	let seconds = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();

	return `${day}-${month}-${year} ${hour}:${minute}:${seconds}`;
}

const tmi = require("tmi.js");
const client = new tmi.Client({
	identity: {
		username: "uwuskochany",
		password: `oauth:${process.env.TOKEN}`,
	},
	channels: channels,
});

client.connect().catch(console.error);

try {
	if (!fs.existsSync(folderPath)){
		fs.mkdirSync(folderPath)
	}
	for(channel of client.opts.channels){
		channel = channel.substring(1);
		if (!fs.existsSync(folderPath + "/" + channel)) {
			fs.mkdirSync(folderPath + "/" + channel);
		}
		if (!fs.existsSync(folderPath + "/" + channel + "/Users")){
			fs.mkdirSync(folderPath + "/" + channel + "/Users");
		}
		if (!fs.existsSync(folderPath + "/" + channel + "/Days")){
			fs.mkdirSync(folderPath + "/" + channel + "/Days");
		}
	}
	

} catch (err) {
	console.error(err);
}

client.on("message", (channel, userstate, message, self) => {
	if (self) return;
	let timeOfMessage = getTimeOfMessage();
	console.log(`[${timeOfMessage}] ${userstate["display-name"]}: ${message}`);

	fs.appendFile(
		`${folderPath}/${channel.substring(1)}/Users/${userstate.username}.txt`,
		`[${timeOfMessage}] ${userstate["display-name"]}: ${message}\n`,
		function (err) {
			if (err) throw err;
		}
	);


});
