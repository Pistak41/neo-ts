import {
    type ChatInputCommandInteraction,
    type CacheType,
    SlashCommandBuilder
} from 'discord.js';
import { imBack } from '../assets/musics';
import { playSound } from '../helpers/voice';

export const data = new SlashCommandBuilder()
    .setName('vuelve')
    .setDescription('**PHOBOS POR SIEMPRE**');

export const execute = async (i: ChatInputCommandInteraction<CacheType>) => playSound(i, imBack, '**PHOBOS POR SIEMPRE**');
