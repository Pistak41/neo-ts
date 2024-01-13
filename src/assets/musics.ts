import { createAudioResource } from '@discordjs/voice';
import { join } from 'path';

export const chad = createAudioResource(join(__dirname, 'chad.mp3'));
export const imBack = createAudioResource(join(__dirname, 'im-back.mp3'));
export const patatin = createAudioResource(join(__dirname, 'patatin.mp3'));
