/* eslint-disable @typescript-eslint/no-var-requires */
import 'dotenv/config';
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import fs from 'fs';
import { CommandProps } from './commands/pone';

const { TOKEN, CLIENT_ID } = process.env;

const rest = new REST().setToken(TOKEN!);

const commands: CommandProps[] = [];

for (const command of fs.readdirSync('./dist/commands')) {
    const commandNode = require(`./commands/${command}`);
    if ('data' in commandNode && 'execute' in commandNode) {
        commands.push({ data: commandNode.data.toJSON(), execute: commandNode.execute });
    } else {
        console.error(`[WARNING] The command at ${command} is missing a required "data" or "execute" property.`);
    }
}

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        rest.put(
            Routes.applicationCommands(CLIENT_ID!),
            { body: commands.map(({ data }) => data) }
        );

        console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages
    ]
});

client.on('interactionCreate', i => {
    if (!i.isChatInputCommand()) return;

    commands.find(({ data: { name } }) => i.commandName === name)?.execute(i);
});

client.login(TOKEN!);
