import {
    type ChatInputCommandInteraction,
    type CacheType,
    SlashCommandBuilder
} from 'discord.js';
import { patatin } from '../assets/musics';
import { playSound } from '../helpers/voice';

export const data = new SlashCommandBuilder()
    .setName('patatin')
    .setDescription('**A TUS HIJOS PA MI**');

export const execute = async (i: ChatInputCommandInteraction<CacheType>) => playSound(i, patatin, '**A TUS HIJOS PA MI**');
