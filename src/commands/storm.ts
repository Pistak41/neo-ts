import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, GuildMember, Client } from 'discord.js';
import { createAudioPlayer, joinVoiceChannel, createAudioResource, AudioPlayerError } from '@discordjs/voice';
import { join } from 'path';

const command = 'phobos';
const description = "𝐓𝐎𝐃𝐎𝐒 𝐒𝐎𝐌𝐎𝐒 𝐏𝐇𝐎𝐁𝐎𝐒";

export const data = new SlashCommandBuilder()
    .setName(command)
    .setDescription(description);

export const run = async (interaction: ChatInputCommandInteraction<CacheType>, client: Client) => {

    const { member, client: { guilds: { cache } } } = interaction

    const player = createAudioPlayer();

    if (member == null) return interaction.reply("Boludito no estas en ningun canal de voz");
    if ((member as GuildMember).voice.channel == null) return interaction.reply("Boludito no estas en ningun canal de voz");

    const { voice: { channel } } = (member as GuildMember);

    const connection = joinVoiceChannel({
        channelId: channel!.id,
        guildId: "715041416312651846",
        adapterCreator: cache.get("715041416312651846")!.voiceAdapterCreator
    }).subscribe(player);

    const resource = createAudioResource(join(__dirname, '../music/im-back.mp3'), {
        metadata: {
            title: 'Soy la tormenta'
        }
    });

    player.play(resource);

    player.on('error', ({ resource: { metadata }, message }: AudioPlayerError) => {
        console.error('Error: ', message, 'with track', (metadata as any).title);
    });

    interaction.reply('**IM AM THE STORM...**');

};





// const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
// const play = require('play-dl');
// const { SlashCommandBuilder } = require('discord.js');

// module.exports = {
//     command: "vuelve",
//     description: "𝐈 𝐀𝐌 𝐓𝐇𝐄 𝐒𝐓𝐎𝐑𝐌 𝐓𝐇𝐀𝐓 𝐈𝐒 𝐀𝐏𝐏𝐑𝐎𝐀𝐂𝐇𝐈𝐍𝐆",
//     create: () => {
//         return new SlashCommandBuilder().setName("vuelve").setDescription("𝐈 𝐀𝐌 𝐓𝐇𝐄 𝐒𝐓𝐎𝐑𝐌 𝐓𝐇𝐀𝐓 𝐈𝐒 𝐀𝐏𝐏𝐑𝐎𝐀𝐂𝐇𝐈𝐍𝐆")
//     },
//     run: async (interaction, client) => {
//         const player = createAudioPlayer();

//         const connection = joinVoiceChannel({
//             channelId: "990119021804400660",
//             guildId: "715041416312651846",
//             adapterCreator: client.guilds.cache.get("715041416312651846").voiceAdapterCreator
//         }).subscribe(player);

//         let resource = createAudioResource(require("path").resolve(__dirname, './../im-back.mp3'));

//         player.on('error', error => {
//             console.error('Error:', error.message, 'with track', error.resource.metadata.title);
//         });

//         player.play(resource);


//         player.on('error', error => {
//             console.error('Error:', error.message, 'with track', error.resource.metadata.title);
//         });
//         interaction.reply('**IM AM THE STORM...**');
//     }
// }