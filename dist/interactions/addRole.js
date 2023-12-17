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
exports.addRole = void 0;
const addRole = ({ message: { id: msgID, guild }, emoji: { id: emojiID } }, { id }) => __awaiter(void 0, void 0, void 0, function* () {
    const vicio = yield guild.roles.fetch('727983980426690580');
    if (msgID === '1184336326343012453' && emojiID === '839225020257009694') {
        const { roles } = yield guild.members.fetch(id);
        roles.add(vicio);
    }
});
exports.addRole = addRole;
