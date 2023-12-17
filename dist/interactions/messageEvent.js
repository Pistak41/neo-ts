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
exports.messageEvent = void 0;
const config_1 = require("../config");
const messageEvent = ({ author, content }) => __awaiter(void 0, void 0, void 0, function* () {
    if (content.startsWith(config_1.prefix)) {
        const command = content.slice(1);
        switch (command) {
            case 'descokentaro':
                author.send('https://tenor.com/boV9m.gif');
                break;
        }
    }
});
exports.messageEvent = messageEvent;
