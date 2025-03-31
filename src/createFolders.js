import "dotenv/config"
import "node:fs"

const folderPath = process.env.FOLDERPATH;
const channels = process.env.CHANNELS.split(",");

function createFolders(client) {
    try {
        if (fs.existsSync(folderPath)) {
            for (channel of client.opts.channels) {
                channel = channel.substring(1);
                if (!fs.existsSync(folderPath + "/" + channel)) {
                    fs.mkdirSync(folderPath + "/" + channel);
                    if (!fs.existsSync(folderPath + "/" + channel + "/Users")){
                        fs.mkdirSync(folderPath + "/" + channel + "/Users");
                    }
                    if (!fs.existsSync(folderPath + "/" + channel + "/Days")){
                        fs.mkdirSync(folderPath + "/" + channel + "/Days");
                    }
                }
            }
        } else {
            fs.mkdirSync(folderPath);
            for (channel of client.opts.channels) {
                channel = channel.substring(1);
                if (!fs.existsSync(folderPath + "/" + channel)) {
                    fs.mkdirSync(folderPath + "/" + channel);
                    if (!fs.existsSync(folderPath + "/" + channel + "/Users")){
                        fs.mkdirSync(folderPath + "/" + channel + "/Users");
                    }
                    if (!fs.existsSync(folderPath + "/" + channel + "/Days")){
                        fs.mkdirSync(folderPath + "/" + channel + "/Days");
                    }
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
}

export default createFolders()