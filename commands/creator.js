const {MessageEmbed} = require('discord.js');
const {logerrs, sendtmp} = require("../util/utils");

module.exports = {
    name: 'creator',
    description: 'A Command.',
    aliases: ['credits', 'hyperz'],
    async execute(client, message, args, config, db){
        const pingEmbed = new MessageEmbed()
        .setColor(config["main_config"].colorhex)
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
        .setDescription(`[@aaron5](https://www.tiktok.com/@aaronr5?lang=en) - *Original TikTok Idea.*\n[@Chris](https://twitter.com/groddy12) - *Management Team.*\n[@Hyperz](https://hyperz.dev/) - *Head Developer.*\n[@Fuel](https://fueldevelopment.net/) - *Added Sharding.*`)
        .setTimestamp()
        .setFooter(`${config["main_config"].copyright}`)

        logerrs(config, message.delete());
        logerrs(config, sendtmp(message.channel, 10000, pingEmbed));
    },
}