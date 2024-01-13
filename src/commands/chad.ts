import {
    type ChatInputCommandInteraction,
    type CacheType,
    SlashCommandBuilder
} from 'discord.js';
import { chad } from '../assets/musics';
import { playSound } from '../helpers/voice';

export const data = new SlashCommandBuilder()
    .setName('chad')
    .setDescription('**GIGACHAD**');

export const execute = async (i: ChatInputCommandInteraction<CacheType>) => playSound(i, chad, 'https://c.tenor.com/epNMHGvRyHcAAAAd/gigachad-chad.gif');
