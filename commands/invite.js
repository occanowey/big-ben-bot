const {MessageEmbed} = require('discord.js');
const { logerrs, sendtmp } = require('../util/utils');

module.exports = {
    name: 'invite',
    description: 'A command.',
    aliases: ['inv'],
    async execute(client, message, args, config, db){
        const pingEmbed = new MessageEmbed()
        .setColor(config["main_config"].colorhex)
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
        .setDescription(`[Bot Invite](https://discord.com/oauth2/authorize?client_id=855971238035324938&permissions=8&scope=bot)\n[Upvote Bot](https://disbot.top/bot/855971238035324938)\n[Support Server](https://hyperz.dev/discord)`)
        .setTimestamp()
        .setFooter(`${config.main_config.copyright}`)

        logerrs(config, message.delete());
        logerrs(config, sendtmp(message.channel, 10000, pingEmbed));
    },
}
