const {MessageEmbed} = require('discord.js');
const {sendtmp, logerrs} = require("../util/utils");

module.exports = {
    name: 'dm',
    description: 'Message a user via the bot.',
    aliases: ['message'],
    async execute(client, message, args, config, db){
        await logerrs(config, (async () => {
            const array = ['704094587836301392', '759247388606070794']


            array.forEach(async a => {
                if(a === message.author.id) {
                    if(!args[0]) {
                        logerrs(config, message.delete());
                        logerrs(config, sendtmp(message.channel, 12000, "Please include a user to message in your command."));

                        return;
                    }

                    if(!args[1]) {
                        logerrs(config, message.delete());
                        logerrs(config, sendtmp(message.channel, 12000, "Please include a message for this user."));

                        return;
                    }

                    var foundmember;

                    if(message.mentions.users.first()) {
                        foundmember = await client.users.fetch(message.mentions.users.first().id)
                    } else if(!isNaN(args[0])) {
                        foundmember = await client.users.fetch(args[0])
                    }

                    if(foundmember == undefined) {
                        logerrs(config, message.delete());
                        logerrs(config, sendtmp(message.channel, 12000, "I was unable to find that user."));

                        return;
                    }

                    const mail = new MessageEmbed()
                    .setColor(config["main_config"].colorhex)
                    .setTitle(`📬 You've Got Mail!`)
                    .setDescription(`${args.slice(1).join(" ")}`)
                    .setTimestamp()
                    .setFooter(`${config.main_config.copyright}`)
                    try { mail.setThumbnail(`${client.user.avatarURL({ dynamic: true })}`) } catch(e) {}

                    await foundmember.send(mail);
                    await message.channel.send("I have successfully messaged the user.");
                }
            });
        }));
    },
}
