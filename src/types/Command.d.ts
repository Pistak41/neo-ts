import type { CacheType, ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';

export interface CommandProps {
    data: RESTPostAPIChatInputApplicationCommandsJSONBody,
    execute: (i: ChatInputCommandInteraction<CacheType>) => Promise<void>,
}
