const {MessageEmbed} = require('discord.js');
const { logerrs, sendtmp } = require('../util/utils');

module.exports = {
    name: 'ping',
    description: 'Pings the bot.',
    aliases: ['beep', 'tag'],
    async execute(client, message, args, config, db){
        const pingEmbed = new MessageEmbed()
        .setColor(config["main_config"].colorhex)
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
        .setDescription(`🏓 Latency is: **${Date.now() - message.createdTimestamp}ms.**`)
        .setTimestamp()
        .setFooter(`Bong!`)

        logerrs(config, message.delete());
        logerrs(config, sendtmp(message.channel, 10000, pingEmbed));
    },
}