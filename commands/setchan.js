const {MessageEmbed} = require('discord.js');
const { logerrs, sendtmp } = require('../util/utils');

module.exports = {
    name: 'setchan',
    description: 'Pings the bot.',
    aliases: ['chanset', 'channel', 'set', 'setchannel', 'channelset'],
    async execute(client, message, args, config, db){
        if (message.member.hasPermission('ADMINISTRATOR')) {

        if(!args[0]) {
            logerrs(config, message.delete());
            logerrs(config, sendtmp(message.channel, 12000, "ERROR: Please include a voice channel in your command."));

            return;
        }

        var foundchannel;

        if(message.mentions.channels.first()) {

            if(message.mentions.channels.first().type === 'dm') {
                logerrs(config, message.delete());
                logerrs(config, sendtmp(message.channel, 12000, "ERROR: That is not a valid channel."));

                return;
            }

            foundchannel = await client.channels.cache.get(message.mentions.channels.first().id)

        } else if(args[0]) {
                foundchannel = await client.channels.cache.get(args[0])

                if(foundchannel == undefined) {
                    try {
                        let somechannel = await client.channels.cache.find(channel => channel.name === args.join(" "))
                        if(somechannel != undefined && somechannel.type != 'dm') {
                            foundchannel = await client.channels.cache.get(somechannel.id)
                        } else {
                            logerrs(config, message.delete());
                            logerrs(config, sendtmp(message.channel, 12000, "ERROR: That is not a valid channel."));

                            return;
                        }
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

        if(foundchannel.type != 'voice') {
            logerrs(config, message.delete());
            logerrs(config, sendtmp(message.channel, 12000, "ERROR: That is not a voice channel."));

            return;
        }

        await db.query(`UPDATE guilds SET chan='${foundchannel.id}' WHERE id='${message.guild.id}'`, async (err, row) => {
            if(err) throw err;

            const pingEmbed = new MessageEmbed()
            .setColor(config["main_config"].colorhex)
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
            .setDescription(`The channel for this guild has been updated to \`${foundchannel.name}\``)
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