import { type AudioResource, NoSubscriberBehavior, createAudioPlayer, joinVoiceChannel } from '@discordjs/voice';
import type { CacheType, ChatInputCommandInteraction } from 'discord.js';

export const connect = (i: ChatInputCommandInteraction<'cached'>) => joinVoiceChannel({
    channelId: i.member.voice.channel!.id,
    guildId: i.guildId,
    adapterCreator: i.guild.voiceAdapterCreator
});

export const playSound = (i: ChatInputCommandInteraction<CacheType>, audio: AudioResource, message = '') => {
    if (!i.inGuild || !i.inCachedGuild()) return i.reply('No estas en un server gil!');
    if (!i.member.voice.channel) return i.reply('No estas en un canal de voz gil!');

    const player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause
        }
    });

    player.play(audio);

    connect(i).subscribe(player);

    player.on('error', console.error);

    i.reply(message);
};
