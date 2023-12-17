"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.data = void 0;
const discord_js_1 = require("discord.js");
const voice_1 = require("@discordjs/voice");
const path_1 = require("path");
const command = 'phobos';
const description = "𝐓𝐎𝐃𝐎𝐒 𝐒𝐎𝐌𝐎𝐒 𝐏𝐇𝐎𝐁𝐎𝐒";
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName(command)
    .setDescription(description);
const run = (interaction, client) => __awaiter(void 0, void 0, void 0, function* () {
    const { member, client: { guilds: { cache } } } = interaction;
    const player = (0, voice_1.createAudioPlayer)();
    if (member == null)
        return interaction.reply("Boludito no estas en ningun canal de voz");
    if (member.voice.channel == null)
        return interaction.reply("Boludito no estas en ningun canal de voz");
    const { voice: { channel } } = member;
    const connection = (0, voice_1.joinVoiceChannel)({
        channelId: channel.id,
        guildId: "715041416312651846",
        adapterCreator: cache.get("715041416312651846").voiceAdapterCreator
    }).subscribe(player);
    const resource = (0, voice_1.createAudioResource)((0, path_1.join)(__dirname, '../music/im-back.mp3'), {
        metadata: {
            title: 'Soy la tormenta'
        }
    });
    player.play(resource);
    player.on('error', ({ resource: { metadata }, message }) => {
        console.error('Error: ', message, 'with track', metadata.title);
    });
    interaction.reply('**IM AM THE STORM...**');
});
exports.run = run;
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
