const {MessageEmbed} = require('discord.js');
const { logerrs, sendtmp } = require('../util/utils');

module.exports = {
    name: 'logs',
    description: 'Set a logging channel.',
    aliases: ['log', 'logging', 'setlogs', 'setlog'],
    async execute(client, message, args, config, db){
        if (message.member.hasPermission('ADMINISTRATOR')) {

        var foundchannel;

        if(message.mentions.channels.first()) {
            foundchannel = await client.channels.cache.get(message.mentions.channels.first().id)
        } else if(args[0]) {
                foundchannel = await client.channels.cache.get(args[0])

                if(foundchannel == undefined) {
                    try {
                        let somechannel = await client.channels.cache.find(channel => channel.name === args.join(" "))
                        if(somechannel == undefined) {
                            logerrs(config, message.delete());
                            logerrs(config, sendtmp(message.channel, 12000, "ERROR: That is not a valid channel."));

                            return;
                        }
                        foundchannel = await client.channels.cache.get(somechannel.id)
                    } catch(e) {
                        if(config.main_config.debugmode) return console.log(e);
                    }
                }
        }

        if(foundchannel == undefined) {
            logerrs(config, message.delete());
            logerrs(config, sendtmp(message.channel, 12000, "ERROR: That is not a valid channel."));

            return;
        }

        if(foundchannel.type != 'text') {
            logerrs(config, message.delete());
            logerrs(config, sendtmp(message.channel, 12000, "ERROR: That is not a text channel."));

            return;
        }

        await db.query(`UPDATE guilds SET logs='${foundchannel.id}' WHERE id='${message.guild.id}'`, async (err, row) => {
            if(err) throw err;

            const pingEmbed = new MessageEmbed()
            .setColor(config["main_config"].colorhex)
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
            .setDescription(`The logs channel for this guild has been updated to \`${foundchannel.name}\``)
            .setTimestamp()
            .setFooter(`${config.main_config.copyright}`)

            logerrs(config, message.delete());
            logerrs(config, sendtmp(message.channel, 10000, pingEmbed));
        });

    } else {
        logerrs(config, message.delete());
        logerrs(config, sendtmp(message.channel, 12000, "You are missing the permission(s) `ADMINISTRATOR`"));
    }
    },
}
