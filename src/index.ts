import 'dotenv/config';
import { Client, RoleResolvable } from 'discord.js';
import { loadCommands } from './helpers/utils.js';
import { intents } from './config/intents.js';
import { partials } from './config/partials.js';

const { TOKEN } = process.env;

loadCommands().then(commands => {
    const client = new Client({
        intents,
        partials
    });

    client.on('interactionCreate', i => {
        if (!i.isChatInputCommand()) return;

        commands.find(({ data: { name } }) => i.commandName === name)?.execute(i);
    });

    client.on('ready', ({ user: { tag } }) => {
        console.log(`CLIENT LOGGED AS -> ${tag}`);
    });

    client.on('messageReactionAdd', async ({ message: { id: msgID, guild }, emoji: { id: emojiID } }, { id }) => {
        const vicio = await guild!.roles.fetch('727983980426690580') as RoleResolvable;

        if (msgID === '1184336326343012453' && emojiID === '839225020257009694') {
            const { roles } = await guild!.members.fetch(id);

            roles.add(vicio);
        }
    });

    client.login(TOKEN!);
});
