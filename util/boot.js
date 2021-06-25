const chalk = require('chalk'),
      figlet = require(`figlet`),
      carden = require('carden'),
      config = require(`../config.json`),
      harddata = require('./dadata.json'),
      fs = require('fs'),
      { join } = require(`path`);

function get_os_name() {
    switch(process.platform) {
        case 'aix':
            return 'IBM AIX';

        case 'android':
            return 'Android';

        case 'darwin':
            return 'Apple Darwin';

        case 'freebsd':
            return 'FreeBSD';

        case 'netbsd':
            return 'NetBSD';

        case 'linux':
            return 'Linux/Linux Distro';

        case 'openbsd':
            return 'OpenBSD';

        case 'sunos':
            return 'SunOS';

        case 'win32':
        case 'cygwin':
            return 'Windows';

        default:
            return 'Unknown';
    }
}

module.exports = {
    startupScreen(client) {
        // let unknown_1 = fs.existsSync(join(__dirname, '../../logs/data-holder.txt'));

        // let unknown_2;
        // fs.readdir(join(__dirname, '../../events/'), (err, files) => {
        //     if(err)
        //         events = 'Failed';
        //     events = files.length;
        // });

        let discordjs_version = require('discord.js').version;
        let header = figlet.textSync(harddata.main.name, {width: 500});

        let node_version = process.version;
        if(Number(node_version.slice(1).split('.')[0] < 13))
            node_version += chalk.red(' (Consider Updating)');

        console.log(carden(
            chalk.blue(header),
            chalk.white`
Logged in as ${client.user.tag} (${chalk.green(client.user.id)})
Online for ${chalk.green(client.guilds.cache.size)} guilds and ${chalk.green(client.users.cache.size)} users.

Prefix: ${chalk.blue(config.main_config.prefix)} (Default)
Commands: ${harddata.main.commands}
Events: ${harddata.main.events}
Created By: ${chalk.blue(`Hyperz#0001`)}

Operating System: ${get_os_name()}
Process PID: ${process.pid}
Discord.js Version: ${discordjs_version}
Node Version: ${node_version}
Debug Mode: ${chalk.yellow(config.main_config.debugmode)}

  Support available at ${chalk.blue(harddata.main.support)}`,
            {
                margin: 1,
                padding: 1,

                backgroundColor: 'black',

                header: {
                    padding: 1,
                    borderStyle: 'classic',
                },
                content: {
                    borderStyle: 'single',
                    borderColor: 'blue',
                },
            }
        ));

        console.log(`\n------ CONSOLE LOGGING BEGINS BELOW ------\n`);
    }
}