import {
    type ChatInputCommandInteraction,
    type CacheType, SlashCommandBuilder,
    type RESTPostAPIChatInputApplicationCommandsJSONBody
} from 'discord.js';

export interface CommandProps {
    data: RESTPostAPIChatInputApplicationCommandsJSONBody,
    execute: (i: ChatInputCommandInteraction<CacheType>) => Promise<void>,
}

export const data = new SlashCommandBuilder()
    .setName('pone')
    .setDescription('Coger')
    .addStringOption(opt => opt
        .setName('apt')
        .setDescription('nombre de algo')
        .setRequired(true)
    );

export const execute = (i: ChatInputCommandInteraction<CacheType>) => {
    const opt = i.options.getString('apt');

    if (!opt) return i.reply('Pone algo gil!');
};
