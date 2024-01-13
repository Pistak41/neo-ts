import fs from 'fs';
import { REST, Routes } from 'discord.js';
import type { CommandProps } from '../types/Command.js';

export const loadCommands = async (): Promise<CommandProps[]> => {
    const { TOKEN, CLIENT_ID } = process.env;

    const imports = await Promise.all(fs.readdirSync('./dist/commands').map(c => import(`../commands/${c}`)));

    const commands: CommandProps[] = imports
        .filter(i => 'data' in i && 'execute' in i)
        .map(({ data, execute }) => ({
            data: data.toJSON(),
            execute
        }));

    const rest = new REST().setToken(TOKEN!);

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

    return commands;
};

export const isValidUrl = (urlString: string) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
};
