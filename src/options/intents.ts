import { BitFieldResolvable, GatewayIntentsString } from "discord.js";

export const intents: BitFieldResolvable<GatewayIntentsString, number> = [
    'Guilds',
    'GuildMembers',
    'GuildMessages',
    'GuildVoiceStates',
    'GuildMessageReactions',
    'MessageContent',
    'DirectMessages',
    'DirectMessageReactions',
]