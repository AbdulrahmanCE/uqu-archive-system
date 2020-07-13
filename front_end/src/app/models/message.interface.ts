import { IAccount } from './account.interface';

export interface IMessage {
    id?: number;
    sender?: IAccount,
    receiver?: IAccount,
    text?: string,
    datetime?: string
}