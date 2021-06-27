const { MessageEmbed } = require("discord.js");
const { logerrs, sendtmp, query } = require("../util/utils");

const ALLOWED_USER_IDS = ["704094587836301392", "759247388606070794"];

module.exports = {
    name: "alert",
    description: "Send out an alert.",
    aliases: ["announce"],
    async execute(client, message, args, config, db) {
        if (!ALLOWED_USER_IDS.includes(message.author.id)) {
            return;
        }

        if (args.length == 0) {
            logerrs(config, message.delete());
            logerrs(config, sendtmp(message.channel, 12000, "Please include an announcement in your message."));

            return;
        }

        const embed = new MessageEmbed()
            .setColor(config.main_config.colorhex)
            .setThumbnail(`${message.author.avatarURL({ dynamic: true })}`)
            .setAuthor(`Notice from ${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config.other_configuration.serverinvite}`)
            .setDescription(`${args.join(" ")}`)
            .setTimestamp()
            .setFooter(`${config.main_config.copyright}`);

        let rows = await query(db, "SELECT * FROM guilds;");
        for (let data of rows) {
            let channel = await client.channels.cache.get(data.logs);
            if (channel != "none") {
                await channel.send(embed);
            }
        }

        logerrs(config, message.delete());
        logerrs(config, sendtmp(message.channel, 12000, "I have posted your announcement in all available channels."));
    },
}