import 'dotenv/config';

import { Client, Interaction, CacheType, Collection } from 'discord.js';
import { intents } from './options/intents';
import { partials } from './options/partials';
import { presence } from './options/presence';
import { addRole } from './interactions/addRole';
import { messageEvent } from './interactions/messageEvent';
import { readdirSync } from 'fs';
import { commandInterface } from './interface/Command';
// import { Manager, Node, NodeOptions } from 'erela.js';

const commands = new Collection<String, commandInterface>();
// manager: Manager;

const bot = new Client({
    intents,
    partials,
    presence,
    rest: {
        version: '10'
    }
});

const commandsJson: any[] = [];

readdirSync(`${__dirname}/commands`)
    .filter(file => file.endsWith('js'))
    .forEach(file => {
        const command: commandInterface = require(`./commands/${file}`);
        commands.set(command.data.name, command);
        commandsJson.push(command.data.toJSON())
    });

// (async () => {
//     try {
//         bot.rest.setToken(bot.token!);
//         await bot.rest.put(Routes.applicationGuildCommands('1001689608268038224', '715041416312651846'), { body: commands });
//     } catch (error) {
//         console.error(error);
//     }
// })();

// const nodes: NodeOptions[] = [
//     {
//         host: '192.168.0.24',
//         password: 'youshallnotpass',
//         port: 2233,
//         secure: true,
//     },
// ];

// bot.manager = new Manager({
//     nodes,
//     send: (id, payload) => {
//         const guild = bot.guilds.cache.get(id);

//         if (guild) guild.shard.send(payload);
//     }
// })
//     .on('nodeConnect', ({ options: { identifier } }: Node) => console.log(`Node "${identifier}" conectado!`))
//     .on('nodeError', ({ options: { identifier } }: Node, { message }: Error) => console.log(`Node "${identifier}" encountered an error: ${message}`))

bot.on('ready', ({ user: { tag } }) => {
    console.log(`CLIENT LOGGED AS -> ${tag}`);

    // const autoRolChannel = bot.channels.cache.get('889627667459100732') as TextChannel;
    // const sexoCaraEmoji = bot.emojis.cache.get('839225020257009694') as GuildEmoji;

    // autoRolChannel
    //     .send({
    //         content: `_Bienvenido Puta_ ***Disfruta del server mas basado *** __**~~y racista ~~**__ ***del conurbano*** :muscle: :moyai: \n\nReacciona a ${sexoCaraEmoji} para obtener tu rol`,
    //         files: ['https://cdn.discordapp.com/attachments/727983224080564346/1184297526216630282/chad-gigachad.gif?ex=658b7605&is=65790105&hm=0478851682c8477e0ffa9ea3427e2dbf9e601d969d343564239fdf3d7b391fd2&'],
    //     })
    //     .then(message => message.react(`${sexoCaraEmoji}`));


    //users.fetch('549330129420288000').then((user) => user.send("Te voy a ser sincero thomi"));
});

bot.on('interactionCreate', async (i: Interaction<CacheType>) => {
    if (!i.isChatInputCommand()) return;

    const command = commands.get(i.commandName);

    if (!command) return;

    try {
        command.run(i, bot);
    } catch (error) {
        i.reply({ content: 'Hubo un error', ephemeral: true });
    }

});

bot.on('messageCreate', messageEvent);

bot.on('messageReactionAdd', addRole);

bot.login(process.env.DISCORD_TOKEN);




