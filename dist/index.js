"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const intents_1 = require("./options/intents");
const partials_1 = require("./options/partials");
const presence_1 = require("./options/presence");
const addRole_1 = require("./interactions/addRole");
const messageEvent_1 = require("./interactions/messageEvent");
const fs_1 = require("fs");
// import { Manager, Node, NodeOptions } from 'erela.js';
const commands = new discord_js_1.Collection();
// manager: Manager;
const bot = new discord_js_1.Client({
    intents: intents_1.intents,
    partials: partials_1.partials,
    presence: presence_1.presence,
    rest: {
        version: '10'
    }
});
const commandsJson = [];
(0, fs_1.readdirSync)(`${__dirname}/commands`)
    .filter(file => file.endsWith('js'))
    .forEach(file => {
    const command = require(`./commands/${file}`);
    commands.set(command.data.name, command);
    commandsJson.push(command.data.toJSON());
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
bot.on('interactionCreate', (i) => __awaiter(void 0, void 0, void 0, function* () {
    if (!i.isChatInputCommand())
        return;
    const command = commands.get(i.commandName);
    if (!command)
        return;
    try {
        command.run(i, bot);
    }
    catch (error) {
        i.reply({ content: 'Hubo un error', ephemeral: true });
    }
}));
bot.on('messageCreate', messageEvent_1.messageEvent);
bot.on('messageReactionAdd', addRole_1.addRole);
bot.login(process.env.DISCORD_TOKEN);
