const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'suggest',
    description: 'Create a suggestion for Big Benjamin.',
    aliases: ['idea', 'feature'],
    async execute(client, message, args, config, con){

        if(message.channel.type === 'dm') {
            return message.channel.send(`Please use a server channel for commands.`)
        }

        const filter = m => m.author.id === message.author.id;

        const embedone = new MessageEmbed()
        .setColor(`${config.main_config.colorhex}`)
        .setDescription(`What is your suggestion?\nType \`end\` to cancel.`)
        .setTimestamp()
        .setFooter(`${config.main_config.copyright}`)

        const embedtwo = new MessageEmbed()
        .setColor(`${config.main_config.colorhex}`)
        .setDescription(`Your suggestion has been submitted!`)
        .setTimestamp()
        .setFooter(`${config.main_config.copyright}`)

        const embedthree = new MessageEmbed()
        .setColor(`${config.main_config.colorhex}`)
        .setDescription(`Cancelling command now...`)
        .setTimestamp()
        .setFooter(`${config.main_config.copyright}`)

        try {
            message.channel.send(embedone).then(() => {
                message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                .then(async collected2 => {
                    let ress = collected2.first().content.toLowerCase()
                    if(ress === 'end') {
                        message.channel.send(embedthree).then(msg => {
                            msg.delete({ timeout: 8000 })
                            message.delete()
                        }).catch(e => {});
                    } else {
                        let answer = collected2.first().content
                        let logger = await client.channels.cache.get(`856221390549155850`)

                        const embedfour = new MessageEmbed()
                        .setColor(`${config.main_config.colorhex}`)
			.setTitle(`New Suggestion Recieved!`)
                        .setDescription(`**User:** ${message.author.tag} - (${message.author.id})\n**Guild:** ${message.guild.name} - (${message.guild.id})\n\n**Suggestion:** \n${answer}`)
                        .setTimestamp()
                        .setFooter(`${config.main_config.copyright}`)
			try { embedfour.setThumbnail(`${message.author.avatarURL({ dynamic: true })}`) } catch(e) {}

                        try {
                            await logger.send(embedfour).catch(e => {});
                            await message.channel.send(embedtwo).then(msg => {
                                msg.delete({ timeout: 12000 })
                                message.delete()
                            }).catch(e => {});
                        } catch(e) {
                            if(config.main_config.debugmode) return console.log(e);
                        }

                    }
                });
            });
        } catch(e) {
            if(config.main_config.debugmode) return console.log(e);
        }
    },
}
