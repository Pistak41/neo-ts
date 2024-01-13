import { type ChatInputCommandInteraction, type CacheType, SlashCommandBuilder } from 'discord.js';
import playDL from 'play-dl';
import { playSound } from '../helpers/voice';
import { createAudioResource } from '@discordjs/voice';
import spotify from '../config/spotify.json';
import { isValidUrl } from '../helpers/utils';

export const data = new SlashCommandBuilder()
    .setName('poneme')
    .setDescription('Te pongo una canción')
    .addStringOption(opt => opt
        .setName('song')
        .setDescription('URL o Nombre de la canción')
        .setRequired(true)
    );

export const execute = async (i: ChatInputCommandInteraction<CacheType>) => {
    await playDL.setToken({ spotify });

    const opt = i.options.getString('song');

    if (!opt) return i.reply('Pone algo gil!');

    if (playDL.is_expired()) {
        await playDL.refreshToken(); // This will check if access token has expired or not. If yes, then refresh the token.
    }

    const [{ url }] = await playDL.search(
        isValidUrl(opt)
            ? playDL.sp_validate(opt)
                ? (await playDL.spotify(opt)).name
                : opt
            : opt
        ,
        { limit: 1 }
    );

    const { stream, type } = await playDL.stream(url);

    playSound(i, createAudioResource(stream, { inputType: type }), `**SONANDO** ${opt}`);
};
