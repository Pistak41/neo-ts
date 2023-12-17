import { InteractionResponse, SlashCommandBuilder, CacheType, ChatInputCommandInteraction, Client } from 'discord.js';

export interface commandInterface {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    run: (interaction: ChatInputCommandInteraction<CacheType>, client: Client) => Promise<InteractionResponse<boolean> | undefined>;
}