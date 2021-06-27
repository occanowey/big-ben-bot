const {MessageEmbed} = require('discord.js');
const { logerrs, sendtmp } = require('../util/utils');

module.exports = {
    name: 'version',
    description: 'A Command.',
    aliases: ['v'],
    async execute(client, message, args, config, db){
        const pingEmbed = new MessageEmbed()
        .setColor(config["main_config"].colorhex)
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
        .setDescription(`**Current Version:** 1.0`)
        .setTimestamp()
        .setFooter(`${config["main_config"].copyright}`)

        logerrs(config, message.delete());
        logerrs(config, sendtmp(message.channel, 10000, pingEmbed));
    },
}