const fs = require('fs');
const config = require('../../config.json');

module.exports = async (client, config, db, channel) => {

    try {

        if(channel.type != 'voice') return;

        await db.query(`SELECT * FROM guilds WHERE chan='${channel.id}'`, async (err, row) => {
            if(err) throw err;
            if(row[0]) {
                await db.query(`UPDATE guilds SET chan='none' WHERE chan='${channel.id}'`, async (err, row) => {
                    if(err) throw err;
                    console.log(`A voice channel was deleted, event mirrored for the guilds database.`)
                });
            }
        });

        await db.query(`SELECT * FROM guilds WHERE logs='${channel.id}'`, async (err, row) => {
            if(err) throw err;
            if(row[0]) {
                await db.query(`UPDATE guilds SET logs='none' WHERE logs='${channel.id}'`, async (err, row) => {
                    if(err) throw err;
                    console.log(`A text channel was deleted, event mirrored for the guilds database.`)
                });
            }
        });

    } catch(e) {
        if(config.main_config.debugmode) return console.log(e);
    }

}
