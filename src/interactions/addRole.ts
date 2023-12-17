import { MessageReaction, PartialMessageReaction, User, PartialUser, RoleResolvable } from 'discord.js';

export const addRole = async ({ message: { id: msgID, guild }, emoji: { id: emojiID } }: MessageReaction | PartialMessageReaction, { id }: User | PartialUser) => {

    const vicio = await guild!.roles.fetch('727983980426690580') as RoleResolvable

    if (msgID === '1184336326343012453' && emojiID === '839225020257009694') {
        const { roles } = await guild!.members.fetch(id)

        roles.add(vicio);
    }
}