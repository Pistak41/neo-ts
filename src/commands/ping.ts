import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, Client } from 'discord.js';

const command = 'ping';
const description = "Te digo tu ping";

export const data = new SlashCommandBuilder()
    .setName(command)
    .setDescription(description);

export const run = async (i: ChatInputCommandInteraction<CacheType>, { ws: { ping } }: Client) => {
    i.reply(`**Pelotudo** Tu ping es de ${ping}ms`);
}