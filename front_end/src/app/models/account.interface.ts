import { IMessage } from './message.interface';

export interface IAccount {
    id?: string;
    username?: string;
    password?: string;
    email?: string;
    avatarURL?: string;
    sendedMessages?: IMessage[];
    receivedMessages?: IMessage[];
    timedate?: string;
    role?: string;
}