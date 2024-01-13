import {
    type ChatInputCommandInteraction,
    type CacheType,
    SlashCommandBuilder
} from 'discord.js';
import { connect } from '../helpers/voice';

export const data = new SlashCommandBuilder()
    .setName('veni')
    .setDescription('**Voy**');

export const execute = async (i: ChatInputCommandInteraction<CacheType>) => {
    if (!i.inGuild || !i.inCachedGuild()) return i.reply('No estas en un server gil!');
    if (!i.member.voice.channel) return i.reply('No estas en un canal de voz gil!');

    connect(i);

    i.reply('**Voy**');
};
