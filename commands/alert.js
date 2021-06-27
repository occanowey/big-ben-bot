const {MessageEmbed} = require('discord.js');
const {logerrs, sendtmp} = require("../util/utils");

module.exports = {
    name: 'alert',
    description: 'Send out an alert.',
    aliases: ['announce'],
    async execute(client, message, args, config, db){
        const array = ['704094587836301392', '759247388606070794']

        array.forEach(async a => {
            if(a === message.author.id) {
                if(!args[0]) {
                    logerrs(config, message.delete());
                    logerrs(config, sendtmp(message.channel, 12000, "Please include an announcement in your message."));

                    return;
                }

                const embed = new MessageEmbed()
                .setColor(config["main_config"].colorhex)
                .setAuthor(`Notice from ${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
                .setDescription(`${args.join(" ")}`)
                .setTimestamp()
                .setFooter(`${config.main_config.copyright}`)
                try { embed.setThumbnail(`${message.author.avatarURL({ dynamic: true })}`) } catch(e) {}

                db.query(`SELECT * FROM guilds`, async (err, rows) => {
                    if(err) throw err;
                    for(let data of rows) {

                        let channel = await client.channels.cache.get(data.logs)

                        if(channel != 'none') {
                            try {
                                channel.send(embed).catch(e => {});
                            } catch(e) {}
                        }

                    }

                    logerrs(config, message.delete());
                    logerrs(config, sendtmp(message.channel, 12000, "I have posted your announcement in all available channels."));
                });
            }
        });
    },
}