import { ActivityType, PresenceData } from "discord.js";

export const presence: PresenceData = {
    activities: [{
        type: ActivityType.Listening,
        name: 'las voces en su cabeza',
        url: 'www.google.com.ar'
    }]
} 