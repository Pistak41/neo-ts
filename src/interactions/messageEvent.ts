import { Message } from "discord.js";
import { prefix } from '../config'

export const messageEvent = async ({ author, content }: Message) => {

    if (content.startsWith(prefix)) {
        const command: string = content.slice(1);

        switch (command) {
            case 'descokentaro':
                author.send('https://tenor.com/boV9m.gif')
                break;
        }
    }

}