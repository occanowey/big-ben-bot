const fs = require('fs');

module.exports = async (client, config, db, guild) =>{

    await db.query(`SELECT * FROM guilds WHERE id='${guild.id}'`, async (err, row) => {
        if(err) throw err;
        if(!row[0]) {
            await db.query(`INSERT INTO guilds (id, chan, logs) VALUES ('${guild.id}', 'none', 'none')`, async (err, row) => {
                if(err) throw err;
            });
        } else if(row[0]) {
            if(row[0].chan != 'none') {
                await db.query(`UPDATE guilds SET chan='none' WHERE id='${guild.id}'`, async (err, row) => {
                    if(err) throw err;
                });
            }

            if(row[0].logs != 'none') {
                await db.query(`UPDATE guilds SET logs='none' WHERE id='${guild.id}'`, async (err, row) => {
                    if(err) throw err;
                });
            }
        }
    });

    console.log(`I have joined: ${guild.name}`)

	changeStatus(client);
        async function changeStatus(client) {
            await client.user.setPresence({
                activity: {
                    name: `b!help | ${client.guilds.cache.size} servers`,
                    type: `WATCHING`
                },
                status: `idle`
            });

        };


}

