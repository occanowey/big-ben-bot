const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'setchan',
    description: 'Pings the bot.',
    aliases: ['chanset', 'channel', 'set', 'setchannel', 'channelset'],
    async execute(client, message, args, config, con){
        if (message.member.hasPermission('ADMINISTRATOR')) {

        if(!args[0]) return message.channel.send(`ERROR: Please include a voice channel in your command.`).then(msg => {
            msg.delete({ timeout: 12000 })
            message.delete()
        }).catch(e => {});

        var foundchannel;

        if(message.mentions.channels.first()) {

            if(message.mentions.channels.first().type === 'dm') return message.channel.send(`ERROR: That is not a valid channel.`).then(m => {
                m.delete({ timeout: 12000 })
                message.delete()
            }).catch(e => {});

            foundchannel = await client.channels.cache.get(message.mentions.channels.first().id)

        } else if(args[0]) {
                foundchannel = await client.channels.cache.get(args[0])

                if(foundchannel == undefined) {
                    try {
                        let somechannel = await client.channels.cache.find(channel => channel.name === args.join(" "))
                        if(somechannel != undefined && somechannel.type != 'dm') {
                            foundchannel = await client.channels.cache.get(somechannel.id)
                        } else {
                            return message.channel.send(`ERROR: That is not a valid channel.`).then(m => {
                                m.delete({ timeout: 12000 })
                                message.delete()
                            }).catch(e => {});
                        }
                    } catch(e) {
                        if(config.main_config.debugmode) return console.log(e);
                    }
                }
        }

        if(foundchannel == undefined) {
            return message.channel.send(`ERROR: That is not a valid channel.`).then(m => {
                m.delete({ timeout: 12000 })
                message.delete()
            }).catch(e => {});
        }

        if(foundchannel.type != 'voice') {
            return message.channel.send(`ERROR: That is not a voice channel.`).then(m => {
                m.delete({ timeout: 12000 })
                message.delete()
            }).catch(e => {});
        }

        await con.query(`UPDATE guilds SET chan='${foundchannel.id}' WHERE id='${message.guild.id}'`, async (err, row) => {
            if(err) throw err;

            const pingEmbed = new MessageEmbed()
            .setColor(config["main_config"].colorhex)
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
            .setDescription(`The channel for this guild has been updated to \`${foundchannel.name}\``)
            .setTimestamp()
            .setFooter(`${config.main_config.copyright}`)

            message.channel.send(pingEmbed).then(msg => msg.delete({ timeout: 10000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
            message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        });

    } else {
        message.channel.send(`You are missing the permission(s) \`ADMINISTRATOR\``).then(m => {
            m.delete({ timeout: 12000 })
            message.delete()
        }).catch(e => {});
    }
    },
}